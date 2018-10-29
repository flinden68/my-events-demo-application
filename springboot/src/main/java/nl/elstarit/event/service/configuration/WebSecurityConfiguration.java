package nl.elstarit.event.service.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
  @Value("${service.cors.origins}")
  private String corseOrigins;

  @Value("${service.cors.allowedMethods}")
  private String allowedMethods;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http.cors()
      .and()
      .csrf().disable()
      .authorizeRequests()
            .antMatchers("/event/**").permitAll()
            .antMatchers("/events/**").permitAll();
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
}
