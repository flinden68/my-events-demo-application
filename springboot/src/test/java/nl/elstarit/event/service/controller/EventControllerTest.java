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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class EventControllerTest {

  private static final int QTY = 20;

  @MockBean
  EventRepository eventRepository;

  @Autowired
  private MockMvc mockMvc;

  @Before
  public void setUp() {

    eventRepository.deleteAll();
    Instant instant = Instant.now();

    for (int i = 0; i < QTY; i++) {
      Event event = new Event();
      event.setTitle("Test title " + i);
      event.setDescription("Test description " + i);
      eventRepository.save(event);
    }

  }

  @Test
  public void dummyTest(){

  }

  //@Test
  public void getEventById() throws Exception{
    List<Event> mockEvents = new ArrayList<>();

    Event event1 = new Event();
    event1.setId("111111");
    event1.setTitle("Test1");
    mockEvents.add(event1);

    Event event2 = new Event();
    event1.setId("22222");
    event2.setTitle("Test2");
    mockEvents.add(event2);

    when(eventRepository.findAll()).thenReturn(mockEvents);

    MvcResult mvcResult =
      mockMvc
        .perform(get("/event/111111").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().is2xxSuccessful())
        .andReturn();

    Assert.assertNotNull(mvcResult);
    Assert.assertNotNull(mvcResult.getResponse());

    String json = mvcResult.getResponse().getContentAsString();
    Event event =
      new ObjectMapper().readValue(json, new TypeReference<Event>() {});

    Assert.assertEquals("111111", event.getId());
  }

  @Test
  public void shouldCreateEvent() throws Exception{
    Event mockEvent = new Event();
    mockEvent.setId("111111");
    mockEvent.setTitle("Test1");

    String request = new ObjectMapper().writeValueAsString(mockEvent);

    when(eventRepository.findByTitle(anyString())).thenReturn(Optional.empty());
    when(eventRepository.save(any(Event.class))).thenReturn(mockEvent);

    MvcResult mvcResult =
            mockMvc
                    .perform(post("/event").content(request).contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andReturn();

    Assert.assertNotNull(mvcResult);
    Assert.assertNotNull(mvcResult.getResponse());

    String json = mvcResult.getResponse().getContentAsString();
    Event event = new ObjectMapper().readValue(json, new TypeReference<Event>() {});

    Assert.assertEquals(mockEvent, event);
  }

}
