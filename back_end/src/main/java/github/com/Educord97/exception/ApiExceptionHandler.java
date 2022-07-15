package github.com.Educord97.exception;

import java.time.OffsetDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler{
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		PrototypeMessage prototypeMessage = new PrototypeMessage();
		prototypeMessage.setStatus(status.value());
		prototypeMessage.setDataHora(OffsetDateTime.now());
		prototypeMessage.setTitulo("Um ou mais campos estão inválidos");
		
		return handleExceptionInternal(ex, prototypeMessage , headers, status, request);
	}
	

}
