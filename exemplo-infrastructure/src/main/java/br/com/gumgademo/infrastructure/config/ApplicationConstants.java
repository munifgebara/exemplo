package br.com.gumgademo.infrastructure.config;

import io.gumga.core.GumgaValues;
import org.springframework.stereotype.Component;
import java.util.Properties;

@Component
public class ApplicationConstants implements GumgaValues {

    private static final String DEFAULT_SECURITY_URL = "http://192.168.25.250";
    private Properties properties;

    public ApplicationConstants() {
        this.properties = getCustomFileProperties();
    }

    @Override
    public String getGumgaSecurityUrl() {
        return this.properties.getProperty("url.host", DEFAULT_SECURITY_URL).concat("/security-api/publicoperations");
    }

    @Override
    public boolean isLogActive() {
        return true;
    }

    @Override
    public String getCustomPropertiesFileName() {
        return "exemplo.properties";
    }

}
