package nl.elstarit.event.service.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Event {
  @Id
  private String id;

  private String title;
  private String description;

  @JsonProperty("start")
  private long startDate;

  @JsonProperty("end")
  private long endDate;

  @CreatedDate
  private LocalDateTime created;

  @LastModifiedDate
  private LocalDateTime modified;

  @JsonProperty("user_id")
  private String userId;

}
