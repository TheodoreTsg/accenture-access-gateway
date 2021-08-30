package you.shall.not.pass.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
        registry.addMapping("/**").allowedHeaders("*");
        registry.addMapping("/**").allowCredentials(true);
        registry.addMapping("/**").exposedHeaders("*, Set-Cookie");
    }
}
