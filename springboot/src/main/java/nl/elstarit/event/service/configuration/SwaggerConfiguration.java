package nl.elstarit.event.service.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

  @Value("${swagger.enabled}")
  private boolean swaggerEnabled;

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo())
      .enable(swaggerEnabled)
      .select()
            .paths(PathSelectors.regex("(?!/error).+"))
            .paths(PathSelectors.regex("(?!/actuator).+"))
            .build();
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
      .title("Event Service API")
      .description("Event Service API")
      .version("1.0")
      .build();
  }
}
