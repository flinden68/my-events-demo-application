package nl.elstarit.event.service.controller;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.event.service.model.Event;
import nl.elstarit.event.service.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/events")
public class EventsController {

  @Autowired private EventRepository eventRepository;

  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity<List<Event>> getEvents() {
    List<Event> events = eventRepository.findAll();
    if (events == null || events.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(events, HttpStatus.OK);
  }

  @GetMapping(value = "/{userId}", produces = "application/json")
  public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable("userId") String userId) {
    Optional<List<Event>> events = eventRepository.findByUserId(userId);
    if (events.isPresent()) {
      return new ResponseEntity<>(events.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
