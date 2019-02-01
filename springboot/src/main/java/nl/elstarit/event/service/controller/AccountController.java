package nl.elstarit.event.service.controller;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.event.service.model.Account;
import nl.elstarit.event.service.model.Event;
import nl.elstarit.event.service.repository.AccountRepository;
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
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountRepository repository;

    @GetMapping(value="/id/{id}", produces = "application/json")
    public ResponseEntity<Account> findById(@PathVariable("id") String id) {
        Optional<Account> account = repository.findById(id);

        return account.map(account1 -> new ResponseEntity<>(account1, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @GetMapping(value="/email/{email}", produces = "application/json")
    public ResponseEntity<Account> findByEmail(@PathVariable("email") String email) {
        Optional<Account> account = repository.findByEmail(email);

        return account.map(account1 -> new ResponseEntity<>(account1, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PostMapping(value="/create", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Account> create(@Valid @RequestBody Account account, Errors errors) {

        if(errors.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Account storedAccount = repository.save(account);
        if(storedAccount != null){
            return new ResponseEntity<>(storedAccount, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping(value="/update/{id}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Account> update(@PathVariable("id") String id, @Valid @RequestBody Account account, Errors errors) {

        if(errors.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Account> storedAccount = repository.findById(id);
        if(storedAccount.isPresent()){
            storedAccount.get().setEmail(account.getEmail());
            storedAccount.get().setName(account.getName());
            storedAccount.get().setLanguage(account.getLanguage());

            Account updatedAccount = repository.save(storedAccount.get());

            if(updatedAccount != null) {
                return new ResponseEntity<>(repository.save(storedAccount.get()), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping(value="/delete/{id}", consumes = "application/json")
    public ResponseEntity<Account> delete(@PathVariable("id") String id) {
        Optional<Account> account = repository.findById(id);
        if(account.isPresent()){
            repository.delete(account.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
