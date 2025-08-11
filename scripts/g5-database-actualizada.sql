-- BASE DE DATOS ACTUALIZADA PARA SIMULADOR G5 EDUCATIVO
-- Versión mejorada con más tablas y funcionalidades

-- Eliminar tablas si existen (para reinstalación limpia)
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS user_interactions;
DROP TABLE IF EXISTS simulated_transactions;
DROP TABLE IF EXISTS educational_reveals;
DROP TABLE IF EXISTS package_views;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS users;

-- 1. TABLA DE USUARIOS (visitantes del sitio)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_suspicious BOOLEAN DEFAULT FALSE,
    risk_score INT DEFAULT 0,
    INDEX idx_session (session_id),
    INDEX idx_ip (ip_address)
);

-- 2. TABLA DE PAQUETES (productos ofrecidos)
CREATE TABLE packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    total_value DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. TABLA DE LEADS (personas interesadas)
CREATE TABLE leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    preferred_package_id INT,
    interest_level ENUM('low', 'medium', 'high', 'very_high') DEFAULT 'medium',
    source VARCHAR(50), -- 'chatbot', 'form', 'phone', 'whatsapp'
    status ENUM('new', 'contacted', 'interested', 'suspicious', 'educated') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (preferred_package_id) REFERENCES packages(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_interest (interest_level)
);

-- 4. TABLA DE MENSAJES DEL CHAT
CREATE TABLE chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    lead_id INT,
    message TEXT NOT NULL,
    sender ENUM('user', 'bot') NOT NULL,
    message_type VARCHAR(50), -- 'greeting', 'question', 'objection', 'interest', 'suspicious'
    bot_response_type VARCHAR(50), -- 'standard', 'pressure', 'testimonial', 'urgency'
    sentiment_score DECIMAL(3,2), -- -1.00 a 1.00
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_user_time (user_id, created_at),
    INDEX idx_sender (sender)
);

-- 5. TABLA DE INTERACCIONES DEL USUARIO
CREATE TABLE user_interactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- 'page_view', 'click', 'scroll', 'form_start', 'form_submit'
    element_id VARCHAR(100), -- ID del elemento clickeado
    page_url VARCHAR(255),
    time_spent INT, -- segundos en la página
    scroll_depth INT, -- porcentaje de scroll
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_action (user_id, action_type),
    INDEX idx_time (created_at)
);

-- 6. TABLA DE VISTAS DE PAQUETES
CREATE TABLE package_views (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    package_id INT NOT NULL,
    view_duration INT, -- segundos viendo el paquete
    clicked_buy_button BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    INDEX idx_user_package (user_id, package_id)
);

-- 7. TABLA DE TRANSACCIONES SIMULADAS
CREATE TABLE simulated_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lead_id INT NOT NULL,
    package_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- 'transfer', 'cash', 'crypto'
    status ENUM('pending', 'processing', 'completed', 'failed', 'revealed') DEFAULT 'pending',
    transaction_code VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_code (transaction_code)
);

-- 8. TABLA DE REVELACIONES EDUCATIVAS
CREATE TABLE educational_reveals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    lead_id INT,
    reveal_trigger VARCHAR(50), -- 'payment_attempt', 'suspicious_behavior', 'time_limit', 'manual'
    reveal_method VARCHAR(50), -- 'popup', 'redirect', 'email', 'chat'
    user_reaction VARCHAR(100), -- 'surprised', 'angry', 'grateful', 'suspicious'
    educational_content_shown TEXT,
    feedback_provided TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_trigger (reveal_trigger)
);

-- INSERTAR DATOS INICIALES

-- Paquetes predefinidos
INSERT INTO packages (name, price, original_price, total_value, description, is_popular) VALUES
('Paquete Básico', 150000.00, 300000.00, 200000.00, 'Perfecto para principiantes. Billetes de alta calidad con todas las características de seguridad.', FALSE),
('Paquete Premium', 350000.00, 700000.00, 600000.00, 'La opción más popular. Máxima rentabilidad garantizada.', TRUE),
('Paquete VIP', 800000.00, 1600000.00, 1400000.00, 'Para inversores serios. El paquete con mayor retorno de inversión.', FALSE);

-- PROCEDIMIENTOS ALMACENADOS

-- Procedimiento para registrar interacción
DELIMITER //
CREATE PROCEDURE RegisterInteraction(
    IN p_session_id VARCHAR(255),
    IN p_action_type VARCHAR(50),
    IN p_element_id VARCHAR(100),
    IN p_page_url VARCHAR(255),
    IN p_time_spent INT,
    IN p_scroll_depth INT
)
BEGIN
    DECLARE v_user_id INT;
    
    -- Obtener o crear usuario
    SELECT id INTO v_user_id FROM users WHERE session_id = p_session_id;
    
    IF v_user_id IS NULL THEN
        INSERT INTO users (session_id) VALUES (p_session_id);
        SET v_user_id = LAST_INSERT_ID();
    END IF;
    
    -- Registrar interacción
    INSERT INTO user_interactions (user_id, action_type, element_id, page_url, time_spent, scroll_depth)
    VALUES (v_user_id, p_action_type, p_element_id, p_page_url, p_time_spent, p_scroll_depth);
END //

-- Procedimiento para revelar propósito educativo
CREATE PROCEDURE RevealEducationalPurpose(
    IN p_user_id INT,
    IN p_trigger VARCHAR(50)
)
BEGIN
    DECLARE v_lead_id INT;
    
    -- Obtener lead si existe
    SELECT id INTO v_lead_id FROM leads WHERE user_id = p_user_id ORDER BY created_at DESC LIMIT 1;
    
    -- Actualizar status del lead
    IF v_lead_id IS NOT NULL THEN
        UPDATE leads SET status = 'educated' WHERE id = v_lead_id;
    END IF;
    
    -- Registrar revelación
    INSERT INTO educational_reveals (user_id, lead_id, reveal_trigger, reveal_method, educational_content_shown)
    VALUES (p_user_id, v_lead_id, p_trigger, 'popup', 
            'Este sitio web es una simulación educativa para enseñar sobre técnicas de estafa online. Ningún producto real se vende aquí.');
END //

-- Procedimiento para análisis de riesgo
CREATE PROCEDURE AnalyzeUserRisk(
    IN p_user_id INT
)
BEGIN
    DECLARE v_risk_score INT DEFAULT 0;
    DECLARE v_interaction_count INT;
    DECLARE v_chat_messages INT;
    DECLARE v_time_spent INT;
    
    -- Contar interacciones
    SELECT COUNT(*) INTO v_interaction_count FROM user_interactions WHERE user_id = p_user_id;
    
    -- Contar mensajes de chat
    SELECT COUNT(*) INTO v_chat_messages FROM chat_messages WHERE user_id = p_user_id AND sender = 'user';
    
    -- Calcular tiempo total
    SELECT COALESCE(SUM(time_spent), 0) INTO v_time_spent FROM user_interactions WHERE user_id = p_user_id;
    
    -- Calcular score de riesgo
    SET v_risk_score = v_risk_score + (v_interaction_count * 2);
    SET v_risk_score = v_risk_score + (v_chat_messages * 5);
    SET v_risk_score = v_risk_score + (v_time_spent / 60); -- minutos
    
    -- Actualizar usuario
    UPDATE users SET 
        risk_score = v_risk_score,
        is_suspicious = (v_risk_score > 50)
    WHERE id = p_user_id;
    
    -- Si es muy sospechoso, revelar propósito educativo
    IF v_risk_score > 100 THEN
        CALL RevealEducationalPurpose(p_user_id, 'high_risk_behavior');
    END IF;
END //

DELIMITER ;

-- VISTAS ÚTILES

-- Vista de estadísticas generales
CREATE VIEW stats_general AS
SELECT 
    COUNT(DISTINCT u.id) as total_visitors,
    COUNT(DISTINCT l.id) as total_leads,
    COUNT(DISTINCT cm.user_id) as users_with_chat,
    COUNT(DISTINCT er.user_id) as users_educated,
    AVG(u.risk_score) as avg_risk_score
FROM users u
LEFT JOIN leads l ON u.id = l.user_id
LEFT JOIN chat_messages cm ON u.id = cm.user_id
LEFT JOIN educational_reveals er ON u.id = er.user_id;

-- Vista de conversiones por paquete
CREATE VIEW package_conversions AS
SELECT 
    p.name,
    p.price,
    COUNT(pv.id) as total_views,
    COUNT(CASE WHEN pv.clicked_buy_button THEN 1 END) as button_clicks,
    COUNT(l.id) as leads_generated,
    ROUND((COUNT(l.id) / COUNT(pv.id)) * 100, 2) as conversion_rate
FROM packages p
LEFT JOIN package_views pv ON p.id = pv.package_id
LEFT JOIN leads l ON p.id = l.preferred_package_id
GROUP BY p.id, p.name, p.price;

-- TRIGGERS

-- Trigger para actualizar actividad del usuario
DELIMITER //
CREATE TRIGGER update_user_activity
    AFTER INSERT ON user_interactions
    FOR EACH ROW
BEGIN
    UPDATE users SET last_activity = NOW() WHERE id = NEW.user_id;
END //

-- Trigger para generar código de transacción
CREATE TRIGGER generate_transaction_code
    BEFORE INSERT ON simulated_transactions
    FOR EACH ROW
BEGIN
    SET NEW.transaction_code = CONCAT('G5-', YEAR(NOW()), '-', LPAD(NEW.id, 6, '0'));
END //

DELIMITER ;

-- Mensaje de confirmación
SELECT 'Base de datos G5 Educativa creada exitosamente!' as mensaje;
SELECT 'Tablas creadas: users, packages, leads, chat_messages, user_interactions, package_views, simulated_transactions, educational_reveals' as tablas;
SELECT 'Procedimientos: RegisterInteraction, RevealEducationalPurpose, AnalyzeUserRisk' as procedimientos;
SELECT 'Vistas: stats_general, package_conversions' as vistas;
