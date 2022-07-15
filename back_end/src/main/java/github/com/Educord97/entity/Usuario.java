package github.com.Educord97.entity;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idCadUsuario; 
	
	@NotNull
	@Size(max = 45)
	@Column(name = "dcr_usuario")
	private String dcrUsuario;
	
	@NotNull
	@Size(max = 45)
	@Column(name = "dcr_login")
	private String dcrLogin;
	
	@NotNull
	@Size(max = 255)
	@Column(name = "dcr_senha")
	private String dcrSenha;
	
	@NotNull
	@Column(name = "dat_cadastro")
	private Instant datCadastro;
	
	@Column(name = "dat_desativacao")
	private Instant datDesativacao;

}
