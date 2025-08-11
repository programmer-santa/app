-- Base de datos para el simulador educativo de scam de billetes G5
-- IMPORTANTE: Este es un proyecto educativo para mostrar técnicas de estafa

CREATE DATABASE IF NOT EXISTS g5_scam_simulator;
USE g5_scam_simulator;

-- Tabla de usuarios/visitantes
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_visits INT DEFAULT 1,
    is_suspicious BOOLEAN DEFAULT FALSE
);

-- Tabla de conversaciones del chatbot
CREATE TABLE chat_conversations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(255),
    message_count INT DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'abandoned', 'converted', 'suspicious') DEFAULT 'active',
    interest_level ENUM('low', 'medium', 'high', 'very_high') DEFAULT 'low',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de mensajes del chat
CREATE TABLE chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id INT,
    sender ENUM('user', 'bot') NOT NULL,
    message TEXT NOT NULL,
    message_category VARCHAR(50), -- greeting, interest, doubt, price, urgency, etc.
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id) ON DELETE CASCADE
);

-- Tabla de paquetes disponibles
CREATE TABLE packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    total_value DECIMAL(10,2) NOT NULL, -- Valor "real" de los billetes
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de denominaciones de billetes por paquete
CREATE TABLE package_bills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    package_id INT,
    denomination INT NOT NULL, -- 20000, 50000, 100000
    quantity INT NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

-- Tabla de "transacciones" simuladas (para fines educativos)
CREATE TABLE fake_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(255),
    package_id INT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

-- Tabla de leads/contactos capturados
CREATE TABLE leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(255),
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    whatsapp VARCHAR(20),
    preferred_contact VARCHAR(20),
    interest_level ENUM('low', 'medium', 'high', 'very_high') DEFAULT 'medium',
    source VARCHAR(50) DEFAULT 'chatbot', -- chatbot, form, direct
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de métricas y analytics
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    total_visitors INT DEFAULT 0,
    new_visitors INT DEFAULT 0,
    chat_conversations INT DEFAULT 0,
    leads_generated INT DEFAULT 0,
    fake_transactions INT DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    avg_session_duration INT DEFAULT 0, -- en segundos
    top_package_interest VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_date (date)
);

-- Tabla de testimonios falsos
CREATE TABLE fake_testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar paquetes iniciales
INSERT INTO packages (name, description, price, original_price, total_value, is_popular) VALUES
('Paquete Básico', 'Perfecto para principiantes. Billetes de alta calidad con todas las características de seguridad.', 150000, 300000, 200000, FALSE),
('Paquete Premium', 'La opción más popular. Máxima rentabilidad garantizada.', 350000, 700000, 600000, TRUE),
('Paquete VIP', 'Para inversores serios. El paquete con mayor retorno de inversión.', 800000, 1600000, 1400000, FALSE);

-- Insertar denominaciones para cada paquete
-- Paquete Básico
INSERT INTO package_bills (package_id, denomination, quantity) VALUES
(1, 50000, 2),
(1, 20000, 5);

-- Paquete Premium  
INSERT INTO package_bills (package_id, denomination, quantity) VALUES
(2, 100000, 3),
(2, 50000, 4),
(2, 20000, 5);

-- Paquete VIP
INSERT INTO package_bills (package_id, denomination, quantity) VALUES
(3, 100000, 8),
(3, 50000, 6),
(3, 20000, 10);

-- Insertar testimonios falsos
INSERT INTO fake_testimonials (name, location, rating, comment) VALUES
('Carlos M.', 'Bogotá', 5, 'Increíble! Compré el paquete premium y en una semana ya había recuperado mi inversión. Los billetes son perfectos.'),
('María L.', 'Medellín', 5, 'Al principio tenía dudas, pero el proceso fue súper fácil. Ya voy por mi tercer paquete!'),
('Andrés P.', 'Cali', 5, 'Excelente calidad y servicio. El envío llegó súper rápido y discreto. 100% recomendado.'),
('Laura S.', 'Barranquilla', 5, 'No lo podía creer cuando vi la calidad. Parecen completamente reales. Muy satisfecha.'),
('Diego R.', 'Bucaramanga', 5, 'La mejor inversión que he hecho. En dos semanas ya tengo ganancias del 80%. Gracias Ana!'),
('Camila T.', 'Pereira', 5, 'Excelente atención al cliente. Ana me explicó todo paso a paso. Muy profesional.');

-- Crear índices para mejor rendimiento
CREATE INDEX idx_users_session ON users(session_id);
CREATE INDEX idx_users_ip ON users(ip_address);
CREATE INDEX idx_chat_session ON chat_conversations(session_id);
CREATE INDEX idx_chat_status ON chat_conversations(status);
CREATE INDEX idx_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_transactions_user ON fake_transactions(user_id);
CREATE INDEX idx_transactions_status ON fake_transactions(status);
CREATE INDEX idx_leads_session ON leads(session_id);
CREATE INDEX idx_analytics_date ON analytics(date);

-- Procedimiento para revelar el propósito educativo
DELIMITER //
CREATE PROCEDURE RevealEducationalPurpose(IN user_session VARCHAR(255))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    
    -- Marcar al usuario como que ha visto la revelación educativa
    UPDATE users 
    SET is_suspicious = TRUE 
    WHERE session_id = user_session;
    
    -- Insertar mensaje educativo en el chat
    INSERT INTO chat_messages (conversation_id, sender, message, message_category)
    SELECT c.id, 'bot', 
           '🚨 REVELACIÓN EDUCATIVA: Este sitio web es una simulación creada con fines educativos para mostrar técnicas comunes de estafa. Los "billetes G5" no existen y ninguna transacción es real. El objetivo es enseñar cómo identificar y evitar este tipo de fraudes. ¡Mantente siempre alerta ante ofertas demasiado buenas para ser verdad!',
           'educational_reveal'
    FROM chat_conversations c 
    WHERE c.session_id = user_session 
    AND c.status = 'active';
    
    SELECT 'Educational purpose revealed successfully' as message;
END //
DELIMITER ;

-- Vista para estadísticas rápidas
CREATE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_visitors,
    COUNT(CASE WHEN total_visits = 1 THEN 1 END) as new_visitors,
    AVG(total_visits) as avg_visits_per_user
FROM users 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Vista para análisis de conversaciones
CREATE VIEW conversation_analysis AS
SELECT 
    c.id,
    c.session_id,
    c.message_count,
    c.interest_level,
    c.status,
    TIMESTAMPDIFF(MINUTE, c.started_at, c.last_message_at) as duration_minutes,
    COUNT(m.id) as total_messages,
    COUNT(CASE WHEN m.sender = 'user' THEN 1 END) as user_messages,
    COUNT(CASE WHEN m.sender = 'bot' THEN 1 END) as bot_messages
FROM chat_conversations c
LEFT JOIN chat_messages m ON c.id = m.conversation_id
GROUP BY c.id, c.session_id, c.message_count, c.interest_level, c.status, c.started_at, c.last_message_at;

-- Trigger para actualizar analytics automáticamente
DELIMITER //
CREATE TRIGGER update_daily_analytics 
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO analytics (date, total_visitors, new_visitors)
    VALUES (CURDATE(), 1, 1)
    ON DUPLICATE KEY UPDATE 
        total_visitors = total_visitors + 1,
        new_visitors = new_visitors + 1;
END //
DELIMITER ;

-- Comentarios finales
-- IMPORTANTE: Esta base de datos es solo para fines educativos
-- Su propósito es mostrar cómo funcionan las técnicas de estafa online
-- NO debe usarse para actividades fraudulentas reales
-- Ayuda a crear conciencia sobre la seguridad digital

SELECT 'Base de datos del simulador G5 creada exitosamente - Solo para fines educativos' as status;
