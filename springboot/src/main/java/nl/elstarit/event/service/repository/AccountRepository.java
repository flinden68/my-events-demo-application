package nl.elstarit.event.service.repository;

import nl.elstarit.event.service.model.Account;
import nl.elstarit.event.service.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> {

  Optional<Account> findByEmail(String userId);
}
