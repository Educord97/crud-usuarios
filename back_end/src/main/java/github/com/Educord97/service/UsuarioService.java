package github.com.Educord97.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import github.com.Educord97.entity.Usuario;
import github.com.Educord97.exception.UsuarioException;
import github.com.Educord97.model.repository.UsuarioRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UsuarioService {

	private final UsuarioRepository usuarioRepository;

	public Usuario salvar(Usuario usuario) {
		boolean loginUsed = usuarioRepository.findByDcrLogin(usuario.getDcrLogin()).stream()
				.anyMatch(usuarioExistente -> !usuarioExistente.equals(usuario));

		if (loginUsed) {
			throw new UsuarioException("Já existe um usuário com esse login, tente com outro login por favor!");
		}

		String password = usuario.getDcrSenha();

		if (!password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$")) {
			
			throw new UsuarioException("A senha deve ser formada por pelo menos um dígito [0-9],"
					+ "pelo menos um caractere minúsculo [az],"
					+ "pelo menos um caractere maiúsculo [AZ],"
					+ "pelo menos um caractere especial como ! @ # & ( ),"
					+ "no mínimo 8 caracteres e no máximo 20 caracteres.");
			
		} 
		return usuarioRepository.save(usuario);
	}
	
	
	@Transactional
	public void deletar(Integer usuarioId) {
		usuarioRepository.deleteById(usuarioId);
	}
}
