package nl.elstarit.event.service.configuration;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
  @Value("${service.cors.origins}")
  private String corseOrigins;

  @Value("${service.cors.allowedMethods}")
  private String allowedMethods;

  @Bean
  public SecurityFilterChain configure(HttpSecurity http) throws Exception {

    http.cors(withDefaults())
      .csrf(withDefaults())
      .authorizeHttpRequests( c -> {
                c.requestMatchers("/event/**").permitAll();
                c.requestMatchers("/events/**").permitAll();
              });

    return http.build();
  }

  @Bean
  CorsFilter corsFilter() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(corseOrigins.replace(" ","").split(",")));
    configuration.setAllowedMethods(Arrays.asList(allowedMethods.replace(" ","").split(",")));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return new CorsFilter(source);
  }

  public MongoClient mongoClient() {
    ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017/test");
    MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .build();

    return MongoClients.create(mongoClientSettings);
  }
}
