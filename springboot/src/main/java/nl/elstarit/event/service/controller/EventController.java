package nl.elstarit.event.service.controller;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.event.service.model.Event;
import nl.elstarit.event.service.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/event")
public class EventController {

  @Autowired private EventRepository eventRepository;

  @GetMapping(value = "/{eventId}", produces = "application/json")
  public ResponseEntity<Event> getEventById(@PathVariable("eventId") String eventId) {
    Optional<Event> event = eventRepository.findById(eventId);

    if(event.isPresent()){
      return new ResponseEntity<>(event.get(), HttpStatus.OK);
    }else{
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
  }

  @PostMapping(value = "/create", produces = "application/json", consumes = "application/json")
  public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event, Errors errors) {

    if(errors.hasErrors()){
      log.error(errors.getAllErrors().toString());
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Event storedEvent = eventRepository.save(event);
    if(storedEvent != null){
      return new ResponseEntity<>(storedEvent, HttpStatus.OK);
    }else{
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PatchMapping(value = "/update", produces = "application/json", consumes = "application/json")
  public ResponseEntity<Event> updateEvent(@Valid @RequestBody Event event, Errors errors) {

    if(errors.hasErrors()){
      log.error(errors.getAllErrors().toString());
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Optional<Event> storedEvent = eventRepository.findById(event.getId());
    if(storedEvent.isPresent()){
      storedEvent.get().setDescription(event.getDescription());
      storedEvent.get().setTitle(event.getTitle());
      storedEvent.get().setStartDate(event.getStartDate());
      storedEvent.get().setEndDate(event.getEndDate());

      Event updatedEvent = eventRepository.save(storedEvent.get());

      if(updatedEvent != null) {
        return new ResponseEntity<>(eventRepository.save(storedEvent.get()), HttpStatus.OK);
      }
    }
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @DeleteMapping(value = "/delete/{eventId}", produces = "application/json")
  public ResponseEntity<Event> deleteEvent(@PathVariable("eventId") String eventId) {

    Optional<Event> event = eventRepository.findById(eventId);
    if(event.isPresent()){
      eventRepository.delete(event.get());
      return new ResponseEntity<>(HttpStatus.OK);
    }else{
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
  }
}
