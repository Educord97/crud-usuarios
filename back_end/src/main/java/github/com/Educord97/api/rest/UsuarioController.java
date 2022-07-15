package github.com.Educord97.api.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import github.com.Educord97.entity.Usuario;
import github.com.Educord97.exception.UsuarioException;
import github.com.Educord97.model.repository.UsuarioRepository;
import github.com.Educord97.service.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UsuarioController {

	private final UsuarioRepository usuarioRepository;
	private final UsuarioService usuarioService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario save(@Valid @RequestBody Usuario usuario) {
		return usuarioService.salvar(usuario);
	}

	@GetMapping("/{usuarioId}")
	public ResponseEntity<Usuario> listById(@PathVariable Integer usuarioId) {
		Usuario usuario = usuarioRepository.findById(usuarioId)
				.orElseThrow(() -> new UsuarioException("Não existe usuário com esse id :" + usuarioId));
		return ResponseEntity.ok(usuario);
	}

	@PutMapping("/{usuarioId}")
	public ResponseEntity<Usuario> update(@PathVariable Integer usuarioId, @Valid @RequestBody Usuario usuario) {
		if (!usuarioRepository.existsById(usuarioId)) {
			return ResponseEntity.notFound().build();
		}

		usuario.setIdCadUsuario(usuarioId);
		usuario = usuarioService.salvar(usuario);

		return ResponseEntity.ok(usuario);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		usuarioService.deletar(id);
	}

	@GetMapping
	public List<Usuario> list() {
		return usuarioRepository.findAll();
	}

}
