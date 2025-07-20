package com.proyectogps.backendMedia.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class DatabaseConnectionService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> testConnection() {
        Map<String, Object> result = new HashMap<>();
        
        try (Connection connection = dataSource.getConnection()) {
            result.put("status", "success");
            result.put("message", "Conexión exitosa a la base de datos");
            result.put("database", connection.getMetaData().getDatabaseProductName());
            result.put("version", connection.getMetaData().getDatabaseProductVersion());
            result.put("url", connection.getMetaData().getURL());
            
            // Probar una consulta simple
            String dbName = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
            result.put("currentDatabase", dbName);
            
        } catch (SQLException e) {
            result.put("status", "error");
            result.put("message", "Error al conectar a la base de datos: " + e.getMessage());
            result.put("errorCode", e.getErrorCode());
            result.put("sqlState", e.getSQLState());
        }
        
        return result;
    }

    public Map<String, Object> getDatabaseInfo() {
        Map<String, Object> info = new HashMap<>();
        
        try {
            // Obtener información de las tablas
            String[] tableNames = {"material", "evaluacion", "planificacion"};
            
            for (String tableName : tableNames) {
                try {
                    int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + tableName, Integer.class);
                    info.put(tableName + "_count", count);
                } catch (Exception e) {
                    info.put(tableName + "_count", "Tabla no existe o error: " + e.getMessage());
                }
            }
            
            info.put("status", "success");
            
        } catch (Exception e) {
            info.put("status", "error");
            info.put("message", "Error al obtener información: " + e.getMessage());
        }
        
        return info;
    }
} 