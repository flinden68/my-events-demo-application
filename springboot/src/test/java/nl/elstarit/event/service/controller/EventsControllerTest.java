package nl.elstarit.event.service.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.elstarit.event.service.model.Event;
import nl.elstarit.event.service.repository.EventRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class EventsControllerTest {

  private static final int QTY = 20;

  @MockBean
  EventRepository eventRepository;

  @Autowired
  private MockMvc mockMvc;

  @Before
  public void setUp() throws Exception {

    eventRepository.deleteAll();
    Instant instant = Instant.now();

    for (int i = 0; i < QTY; i++) {
      Event event = new Event();
      event.setTitle("Test title " + i);
      event.setDescription("Test description " + i);
      event.setStartDate( instant.toEpochMilli());
      event.setStartDate( instant.toEpochMilli()+i);
      eventRepository.save(event);
    }

  }

  @Test
  public void getEvents() throws Exception{
    List<Event> mockEvents = new ArrayList<>();

    Event event1 = new Event();
    event1.setTitle("Test1");
    mockEvents.add(event1);

    Event event2 = new Event();
    event2.setTitle("Test2");
    mockEvents.add(event2);

    when(eventRepository.findAll()).thenReturn(mockEvents);

    MvcResult mvcResult =
      mockMvc
        .perform(get("/events").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn();

    Assert.assertNotNull(mvcResult);
    Assert.assertNotNull(mvcResult.getResponse());

    String json = mvcResult.getResponse().getContentAsString();
    List<Event> events =
      new ObjectMapper().readValue(json, new TypeReference<List<Event>>() {});

    Assert.assertEquals(2, events.size());
  }

}
