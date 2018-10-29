package nl.elstarit.event.service.repository;

import java.util.List;
import java.util.Optional;

import nl.elstarit.event.service.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

  Optional<List<Event>> findByUserId(String userId);

  Optional<Event> findByTitle(String title);
}
