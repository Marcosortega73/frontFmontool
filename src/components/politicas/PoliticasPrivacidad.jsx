import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PoliticasPrivacidad({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{ backgroundColor: "primary.main", color: "#e5e5e5" }}
        >
          Politicas de Privacidad
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            <div className="row text-index-content-header">
              <div className="text-index-date">
                <div className="text-index-date-label">Última actualización</div>
                <div className="text-index-date-value"> Noviembre 2022</div>
              </div>
            </div>
            <div
              data-ssid="937"
              className="text-index-item component component--type--text-index-item"
            >
              <h3 className="text-index-item-title"> Introducción</h3>
              <div className="text-index-item-summary">
                <div className="clearfix text-formatted field field--name-field-text-index-item-summary field--type-text-long field--label-hidden field__item">
                  <p>
                    Competiciones Online FM, sus subsidiarias y afiliadas se comprometen a proteger
                    la privacidad y la seguridad de sus datos personales. Competicones Online FM
                    recopila distintos tipos de información cuando Usted utiliza
                    sus productos y servicios para móviles, en línea y
                    descargables (en conjunto, los "<strong>Productos</strong>
                    ").&nbsp;&nbsp;
                  </p>
                  <p>
                    Esta Política de privacidad explica cómo recopilamos,
                    utilizamos y protegemos sus datos personales cuando Usted
                    usa nuestros Productos o interactúa con nosotros.&nbsp;
                  </p>
                  <p>
                    Al usar nuestros Productos, Usted reconoce que ha leído y
                    comprende los términos de esta Política de privacidad,
                    incluido cómo utilizamos sus datos personales.&nbsp;&nbsp;
                  </p>
                  <p>
                    El controlador de datos es el responsable de recopilar y
                    utilizar sus datos personales.&nbsp; Para cumplir con las
                    leyes de protección de datos, el controlador de datos será
                    la Entidad de Competiciones Online FM con la que Usted contrate un Producto.
                    Para obtener más información, consulte la sección "
                    <strong>Preguntas y cómo contactar con nosotros</strong>" de
                    esta Política de privacidad.&nbsp;&nbsp;
                  </p>
                  <p>
                    Nos reservamos el derecho a actualizar esta Política de
                    privacidad puntualmente, modificándola como corresponda al
                    uso que Usted haga de cualquiera de nuestros Productos.
                    Queremos que disfrute usando nuestros Productos y le rogamos
                    que utilice el sentido común a la hora de revelar datos
                    personales, tanto en dichos Productos como en cualquier otro
                    lugar.&nbsp;
                  </p>
                  <h3>Resumen</h3>
                  <p>
                    Nuestra Política de privacidad contribuye a explicar qué
                    información recopilamos, cómo la utilizamos y qué opciones
                    tiene Usted al respecto. Los puntos clave de nuestra
                    Política de privacidad se establecen a continuación.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-ssid="923"
              className="text-index-item component component--type--text-index-item"
            >
              <h3 className="text-index-item-title">
                {" "}
                1.Información que recopilamos y recibimos
              </h3>
              <div className="text-index-item-summary">
                <div className="clearfix text-formatted field field--name-field-text-index-item-summary field--type-text-long field--label-hidden field__item">
                  <p>
                    Recopilamos datos personales sobre Usted y los dispositivos
                    que utiliza para acceder a nuestros Productos e interactuar
                    con ellos y con nosotros. Recopilamos:
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>
                            (a) Información de registro:&nbsp;&nbsp;&nbsp;&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información que Usted proporciona cuando se
                            registra para acceder a nuestros
                            Productos.&nbsp;&nbsp;&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (b) Información técnica y del dispositivo:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información del dispositivo móvil o el equipo
                            informático que usa para acceder a nuestros
                            Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (c) Comentarios/encuestas/investigación de
                            usuarios:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            sus preguntas, sugerencias o visualizaciones de
                            nuestros Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>(d) Información de terceros:&nbsp;</p>
                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                        </td>
                        <td>
                          <p>
                            la información sobre el uso que Usted hace de
                            nuestros Productos y que se comparte con las
                            plataformas y servicios de terceros asociados a
                            nuestros Productos.&nbsp;
                          </p>
                          <p>&nbsp;</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (e) Información de fuentes disponibles públicamente
                            en línea:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información que Usted ha publicado en plataformas
                            de terceros (como Facebook y Twitter) y que esté
                            relacionada con nuestros Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (f) Información sobre el uso que Usted hace de
                            nuestros Productos:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información que recopilamos cuando utiliza dichos
                            Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>(g) Competiciones:&nbsp;</p>
                        </td>
                        <td>
                          <p>
                            la información que Usted nos proporciona cuando
                            participa en nuestras competiciones.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>(h) Plug-ins de redes sociales:&nbsp;</p>
                        </td>
                        <td>
                          <p>
                            la información que se recopila cuando Usted utiliza
                            plug-ins de redes sociales de terceros en relación
                            con nuestros Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (i) Tecnologías antitrampas y antipirateo:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información que nos ayuda a cerciorarnos de que
                            nuestros Productos se usen de una manera justa y
                            legal.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>(j) Software LiveOps:&nbsp;</p>
                        </td>
                        <td>
                          <p>
                            la información que se procesa mediante las
                            herramientas externas LiveOps cuando Usted utiliza
                            nuestros Productos.&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            (k) Adquisición/Atribución de usuarios y público
                            principal, personalizado o similar:&nbsp;
                          </p>
                        </td>
                        <td>
                          <p>
                            la información que se recopila para ayudarnos a
                            conseguir nuevos usuarios para nuestros Productos y
                            crear un público principal, personalizado y
                            similar.&nbsp;
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="text-index-item-content" >
                <div className="clearfix text-formatted field field--name-field-text-index-item-content field--type-text-long field--label-hidden field__item">
                  <p>
                    Recopilamos datos personales sobre Usted y los dispositivos
                    que utiliza para acceder a nuestros Productos e interactuar
                    con nosotros. Recopilamos:&nbsp;&nbsp;
                  </p>
                  <h4>(A) Información de registro:&nbsp;</h4>
                  <p>
                    Cuando Usted se registra o inicia sesión para usar nuestros
                    Productos (o una cuenta de Competiciones Online FM asociada a estos, como las
                    de discord), es posible que recopilamos información
                    sobre Usted, entre la que se incluye su nombre, información
                    de contacto, edad, genero, preferencias personales y aquella
                    información adicional que haya decidido facilitar. Es
                    posible que deba registrarse con la identificación de la
                    cuenta del operador de su plataforma para usar determinadas
                    características dentro de nuestros Productos. También
                    podemos recopilar su información de contacto, con el
                    objetivo de que pueda registrarse y recibir las
                    comunicaciones de marketing de Competiciones Online FM. En nuestras
                    comunicaciones de marketing usamos píxeles de seguimiento
                    para verificar si se ha abierto el correo electrónico. Como
                    parte de cualquier registro efectuado para usar nuestros
                    Productos, verificaremos la información que utilice para
                    iniciar sesión.&nbsp;
                  </p>
                  <p>
                    Puede registrarse en nuestros Productos usando servicios de
                    terceros, como su cuenta de Facebook. En este caso, Facebook
                    le pedirá permiso para facilitar ciertos datos personales,
                    como su nombre de usuario, la fecha de nacimiento y la
                    información de contacto.&nbsp;&nbsp;
                  </p>
                  <h4>(B) Información técnica y del dispositivo:</h4>
                  <p>
                    Recopilamos información de su actividad de navegación para
                    entender cómo usa nuestros Productos. También podremos
                    recopilar información sobre Usted a partir de las
                    notificaciones o mensajes que publique o envíe en línea, así
                    como de aquello que busque, mire o en lo que participe. La
                    información obtenida a partir de las funciones sociales
                    utilizadas en nuestros Productos, como las comunicaciones
                    dentro del juego, los foros y la funcionalidad del chat,
                    puede ser guardada, copiada o utilizada por Competiciones Online FM, el público
                    o empresas externas.&nbsp;&nbsp;
                  </p>
                  <p>
                    Si accede a nuestros Productos, podremos recopilar
                    información técnica de su equipo o dispositivo móvil, como
                    por ejemplo su información de ubicación en caso de que haya
                    optado por compartirla, qué dispositivos están conectados a
                    Internet, la configuración del hardware, los componentes de
                    sus dispositivos, el software instalado, las actualizaciones
                    y los plug-ins para facilitar el uso de nuestros Productos.
                    Podremos recopilar de manera automática información tal como
                    su sistema operativo, su dirección IP (la dirección única
                    que identifica a su dispositivo en Internet), el tipo de
                    navegador, las preferencias de idioma del navegador y
                    cuándo, con qué frecuencia y durante cuánto tiempo
                    interactúa con nuestros Productos, Sitios web y servicios.
                    Nosotros y/o nuestros proveedores externos podemos usar
                    cookies y tecnologías similares (incluidas, pero sin
                    limitarse a, balizas web y píxeles de seguimiento) o
                    recopilar información sobre su(s) dispositivo(s) para crear
                    un registro de los componentes de sus dispositivos
                    específicos.&nbsp;
                  </p>
                  <p>
                    Consulte también nuestra{" "}
                    <a
                      href="http://www.Competiciones Online FM.co.uk/cookiepolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de cookies
                    </a>
                    .
                  </p>
                  <h4>(C) Comentarios/encuestas/investigación de usuarios:</h4>
                  <p>
                    Recopilaremos datos personales de los mensajes y comentarios
                    que publique en nuestros foros o redes sociales o en la
                    plataforma  y cuando contacte con nosotros, por
                    ejemplo, para formular una pregunta, indicar un problema o
                    hacer un comentario. El servicio de atención telefónica a
                    través de nuestro departamento de servicio de atención al
                    cliente está automatizado y no recopilamos sus datos
                    personales.&nbsp; Si contacta con el equipo de servicio de
                    atención al cliente enviando una{" "}
                    <a
                      href="https://support.Competiciones Online FM.com/hc/es"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      solicitud de asistencia
                    </a>{" "}
                    en línea mediante nuestro sistema de incidencias gestionado
                    por terceros (Zendesk) o por correo postal, conservaremos
                    copias de su correspondencia durante el tiempo que sea
                    necesario para atender su consulta.&nbsp;&nbsp;
                  </p>
                  <p>
                    Si decide participar en nuestras encuestas, es posible que
                    le pidamos que nos proporcione ciertos datos personales,
                    como su nombre y dirección de correo electrónico.&nbsp;
                  </p>
                  <p>
                    De vez en cuando, Competiciones Online FM lleva a cabo sesiones de pruebas de
                    investigación de usuarios para conseguir opiniones de los
                    clientes sobre nuestros Productos. Si participa en tales
                    sesiones, es posible que se le pida que proporcione sus
                    datos personales, incluidos nombre, dirección, edad y correo
                    electrónico. Competiciones Online FM también puede grabar el sonido y la imagen
                    de estas sesiones.&nbsp;
                  </p>
                  <h4>(D) Información de terceros:</h4>
                  <p>
                    Compartimos con ciertos socios externos la información sobre
                    el uso que Usted hace de nuestros Productos.&nbsp;&nbsp;
                  </p>
                  <p>
                    Además, recibimos datos de los Operadores de sus plataformas
                    y otros socios para hacer seguimiento de nuestros Productos
                    y mejorarlos.&nbsp;
                  </p>
                  <h4>
                    (E) Información de fuentes disponibles públicamente en
                    línea:
                  </h4>
                  <p>
                    Competiciones Online FM utiliza su propia tecnología analítica y la de terceros
                    para recopilar información sobre el uso que Usted hace de
                    nuestros Productos.&nbsp; Al hacerlo, podemos recopilar y
                    analizar la información que Usted haya publicado en
                    plataformas de terceros (como Facebook, Twitter y Reddit) y
                    foros públicos. Los datos que Competiciones Online FM recopila pueden incluir
                    comentarios de Facebook, tuits o publicaciones en un foro
                    público si se relacionan específicamente con nuestros
                    Productos.&nbsp;
                  </p>
                  <h4>
                    (F) Información sobre el uso que Usted hace de nuestros
                    Productos:
                  </h4>
                  <p>
                    Cuando Usted visita o utiliza nuestros Productos,
                    recopilamos, procesamos y combinamos información sobre el
                    uso que hace de dichos Productos, como su dirección IP,
                    información de la cuenta del Operador de la plataforma (por
                    ejemplo, la identidad de usuario seudonimizada que tenga
                    asociada a la cuenta de Xbox o Steam), información de
                    hardware y de software y datos agregados de juego, datos de
                    utilización e historial de
                    compras.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    Los Operadores de plataformas también nos refieren datos
                    sobre Usted y el uso que hace de nuestros Productos,
                    incluidos, pero sin limitarse a, datos de compras y de
                    juegos en relación con las interacciones que lleva a cabo
                    con estos.&nbsp;
                  </p>
                  <h4>(G) Competiciones:</h4>
                  <p>
                    Cuando Usted participe en una competición organizada por
                    Competiciones Online FM, es posible que se le pida que proporcione determinados
                    datos personales, como su nombre, dirección de correo
                    electrónico, país de origen y la identidad de usuario que
                    utiliza en el Operador de la plataforma para acceder a
                    nuestros Productos (por ejemplo, la ID de Steam). También se
                    le puede solicitar que envíe una fotografía o un vídeo
                    personales si forma parte de los requisitos de participación
                    en la competición.&nbsp;
                  </p>
                  <p>
                    Se podrá solicitar a los ganadores que indiquen su dirección
                    postal a fin de que Competiciones Online FM les envíe los premios.  Cuando los
                    premios sean en metálico, se le pedirá que se registre con
                    el socio externo autorizado que gestionará el pago de los
                    premios en nuestro nombre.&nbsp;
                  </p>
                  <p>
                    La competición en la que participe tendrá sus propios
                    términos y condiciones, que establecerán los requisitos
                    específicos con más detalle.&nbsp;
                  </p>
                  <h4>(H) Plug-ins de redes sociales:</h4>
                  <p>
                    Algunos Sitios web de Competiciones Online FM pueden incluir plug-ins de redes
                    sociales. Estos plug-ins le permiten compartir nuestro
                    contenido con facilidad a través de las plataformas de las
                    redes sociales, como Facebook y Twitter, normalmente
                    mediante un botón de "Compartir" o "Me gusta".&nbsp;
                  </p>
                  <p>
                    Siempre que Usted entra en una página web de Competiciones Online FM que
                    contiene un plug-in de red social, el navegador establece
                    una conexión con los servidores de esa plataforma de redes
                    sociales. Si decide utilizar el plug-in pulsando un botón de
                    "Compartir" o "Me gusta" sobre el contenido en nuestro sitio
                    web, el navegador compartirá esos datos con la plataforma de
                    redes sociales.&nbsp;
                  </p>
                  <h4>(I) Tecnologías antitrampas y antipirateo:</h4>
                  <p>
                    Competiciones Online FM se esfuerza por asegurarse de que todos los que
                    interactúen con nuestros Productos o participen en nuestras
                    competiciones y torneos lo hagan de manera limpia y legal.
                    Competiciones Online FM puede utilizar tecnologías antitrampas y antipirateo
                    para recopilar ciertos identificadores personales en
                    relación con el uso que hace de nuestros Productos.&nbsp;
                  </p>
                  <h4>(J)Software LiveOps:</h4>
                  <p>
                    Nuestros Productos pueden incluir el software externo
                    LiveOps, que nos ayuda a proporcionar características dentro
                    del juego que son básicas para su experiencia lúdica. Por
                    ejemplo, es posible que dicho software nos permita ofrecer
                    modos multijugador, marcadores, recompensas dentro del juego
                    y muchas más cosas. El software también puede permitir que
                    Competiciones Online FM recopile datos de análisis en relación con el uso que
                    Usted haga del Producto.&nbsp;
                  </p>
                  <h4>
                    (K) Adquisición/Atribución de usuarios y público principal,
                    personalizado o similar
                  </h4>
                  <p>
                    Podemos compartir sus datos personales con Facebook, Google,
                    Twitter y otros socios externos a efectos de marketing (lo
                    que implica la adquisición de nuevos usuarios para nuestros
                    Productos y/o medir el rendimiento y la eficacia de nuestras
                    campañas de marketing) y para ayudarnos a crear un público
                    principal, personalizado o similar. Solo compartiremos sus
                    datos (que suelen ser un ID de dispositivo o una dirección
                    de correo electrónico) con estos socios si Usted da su
                    consentimiento de manera expresa.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-ssid="924"
              className="text-index-item component component--type--text-index-item"
            >
              <h3 className="text-index-item-title">
                {" "}
                2. Cómo usamos la información recopilada
              </h3>
              <div className="text-index-item-summary">
                <div className="clearfix text-formatted field field--name-field-text-index-item-summary field--type-text-long field--label-hidden field__item">
                  <p>
                    Podemos usar la información que recopilamos de las
                    siguientes formas:&nbsp;
                  </p>
                  <h4>(A) Información de registro:&nbsp;</h4>
                  <p>
                    (i) para crear su perfil de forma que Usted pueda acceder a
                    nuestros Productos;&nbsp;
                  </p>
                  <p>(ii) para identificarse cuando inicia sesión;&nbsp;</p>
                  <p>
                    (iii) para darle acceso a sus preferencias de usuario;&nbsp;
                  </p>
                  <p>
                    (iv) para contactar con Usted acerca de sus opiniones sobre
                    nuestros Productos;&nbsp;&nbsp;
                  </p>
                  <p>
                    (v) para notificarle los cambios o actualizaciones en
                    nuestros Productos; y&nbsp;
                  </p>
                  <p>
                    (vi) para propósitos de marketing, basados en sus
                    preferencias de comunicación.&nbsp;
                  </p>
                  <h4>(B) Información de facturación:&nbsp;</h4>
                  <p>
                    (i) para verificar la compra de nuestros Productos y
                    procesar los posibles reembolsos;&nbsp;
                  </p>
                  <p>
                    (ii) para responder a cualquier duda o pregunta y para
                    resolver problemas;&nbsp;
                  </p>
                  <p>
                    (iii) para llevar a cabo investigaciones y análisis con el
                    fin de desarrollar nuestros Productos; y&nbsp;
                  </p>
                  <p>
                    (iv) para protegerle a Usted y a nuestros Productos
                    detectando y evitando el fraude y otros actos que infrinjan
                    nuestras políticas o acuerdos de usuario asociados a dichos
                    Productos.&nbsp;
                  </p>
                  <h4>(C) Información técnica y del dispositivo:</h4>
                  <p>(i) para proporcionarle una experiencia óptima;&nbsp;</p>
                  <p>
                    (ii) para comprender cómo interacciona con nuestros
                    Productos;&nbsp;&nbsp;
                  </p>
                  <p>
                    (iii) para proporcionarle los Productos que
                    solicita;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    (iv) para medir y analizar el uso y la efectividad de
                    nuestros Productos;&nbsp;
                  </p>
                  <p>
                    (v) para entender con qué dispositivos usa nuestros
                    Productos y juega a nuestros videojuegos;&nbsp;
                  </p>
                  <p>
                    (vi) para proporcionar entornos de juego seguros y sin
                    trampas;&nbsp;
                  </p>
                  <p>
                    (vii) para personalizar y optimizar el público objetivo de
                    nuestra publicidad, tanto dentro de nuestros Productos como
                    en nuestros Sitios web;&nbsp;
                  </p>
                  <p>
                    (viii) para operar y mejorar nuestros Productos; y&nbsp;
                  </p>
                  <p>(ix) para corregir errores.&nbsp;</p>
                  <h4>(D) Comentarios/encuestas/investigación de usuarios:</h4>
                  <p>(i) para responder a sus dudas o preguntas;&nbsp;&nbsp;</p>
                  <p>
                    (ii) para registrar los comentarios y la información que
                    proporciona en nuestros foros de juego; y&nbsp;
                  </p>
                  <p>
                    (iii) para llevar a cabo investigaciones y análisis que
                    contribuyan a mejorar nuestros Productos.&nbsp;
                  </p>
                  <h4>(E) Información de terceros:</h4>
                  <p>
                    (i) para proporcionarle ofertas que se adapten a
                    Usted;&nbsp;&nbsp;
                  </p>
                  <p>
                    (ii) para facilitar que comparta cosas en las redes
                    sociales; y&nbsp;
                  </p>
                  <p>(iii) para facilitar su jugabilidad.&nbsp;</p>
                  <h4>
                    (F) Información de fuentes disponibles públicamente en
                    línea:
                  </h4>
                  <p>
                    (i) para saber qué opina de nuestros Productos la
                    comunidad.&nbsp;&nbsp;
                  </p>
                  <h4>
                    (G) Información sobre el uso que Usted hace de nuestros
                    Productos:
                  </h4>
                  <p>
                    (i) para seguir el rendimiento de nuestros
                    Productos;&nbsp;&nbsp;
                  </p>
                  <p>
                    (ii) para la comunicación con nuestros socios y operadores
                    de plataformas; y&nbsp;
                  </p>
                  <p>
                    (iii) para mejorar nuestros sistemas de publicidad y
                    segmentación.&nbsp;
                  </p>
                  <h4>(H) Competiciones:</h4>
                  <p>(i) para comprobar su identidad; y&nbsp;</p>
                  <p>(ii) para enviarle los premios.&nbsp;</p>
                  <h4>(I) Plug-ins de redes sociales:</h4>
                  <p>
                    (i) para permitirle compartir con facilidad nuestro
                    contenido a través de las plataformas de las redes
                    sociales.&nbsp;
                  </p>
                  <h4>(J) Tecnologías antitrampas y antipirateo:</h4>
                  <p>
                    (i) para detectar actividades ilegales o malintencionadas en
                    nuestros Productos.&nbsp;
                  </p>
                  <h4>(K)Software LiveOps:</h4>
                  <p>
                    (i) para proporcionar ciertas características y
                    funcionalidades dentro de los juegos.&nbsp;
                  </p>
                  <h4>
                    (L) Adquisición/Atribución de usuarios y público principal,
                    personalizado o similar
                  </h4>
                  <p>
                    (i) para conseguir nuevos usuarios para nuestros Productos,
                    para medir el rendimiento y la eficacia de nuestras campañas
                    de marketing y para ayudarnos a crear un público principal,
                    personalizado y similar con fines analíticos y de
                    marketing.&nbsp;
                  </p>
                </div>
              </div>
              <div className="text-index-item-content" >
                <div className="clearfix text-formatted field field--name-field-text-index-item-content field--type-text-long field--label-hidden field__item">
                  <p>
                    Usamos los datos personales que recopilamos para los
                    propósitos siguientes:&nbsp;&nbsp;
                  </p>
                  <h4>(A) Información de registro:&nbsp;</h4>
                  <p>
                    La información de registro nos permite proporcionarle acceso
                    a nuestros Productos y suministrarle los mismos. Esto es
                    necesario a efectos de cumplir el contrato que tenemos con
                    Usted. Nos permite autentificar su acceso, contactar con
                    Usted para conocer su opinión y notificarle los cambios o
                    actualizaciones que pueda haber en nuestros
                    Productos.&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    Cuando dispongamos de su consentimiento, y de acuerdo con
                    sus preferencias de comunicación, podremos contactar con
                    Usted para propósitos de marketing e informarle sobre otros
                    Productos y servicios mediante correo electrónico, teléfono,
                    móvil o mensaje integrado en la aplicación.&nbsp;&nbsp;
                  </p>
                  <p>
                    Si Usted elige registrarse en nuestros Productos usando
                    servicios de terceros, como su cuenta de Facebook, Facebook
                    podrá compartir sus datos personales con nosotros, de una
                    manera conforme a su política de privacidad y a la
                    configuración de privacidad de su cuenta de Facebook.&nbsp;
                    Es posible que Facebook y nosotros también podamos vincular
                    las actividades que realiza y su información personal de
                    registro en el sitio, y que podamos enviar notificaciones a
                    sus amigos sobre las actividades que realiza cuando usa
                    nuestros Productos. Si se registra a través de servicios de
                    terceros, Usted deberá visitar el sitio web de terceros y
                    consultar su política de privacidad y su perfil o cuenta de
                    registro para saber cómo se procesarán sus datos y conocer
                    sus opciones.&nbsp;
                  </p>
                  <p>
                    Si Usted no desea que sigamos utilizando sus datos
                    personales de esta forma o cambia de idea con respecto a la
                    recepción de comunicaciones de marketing, podrá cancelar su
                    suscripción cuando quiera, ya sea mediante la opción
                    incluida al efecto en las comunicaciones que recibe o
                    cambiando los ajustes de comunicación. Si cancela su
                    suscripción a las comunicaciones de marketing, se le
                    excluirá de nuestros píxeles de seguimiento de
                    marketing/correos electrónicos. Tenga en cuenta que, si
                    decide cancelar su suscripción, mantendremos un registro de
                    su información de usuario con el propósito legítimo de
                    garantizar que no volvamos a contactar con Usted de esta
                    forma durante el periodo de su objeción, de ser
                    pertinente.&nbsp;
                  </p>
                  <h4>(B) Información de facturación:&nbsp;</h4>
                  <p>
                    Esta información nos permite verificar sus compras con
                    tiendas de terceros y contactar con Usted con el fin de
                    ofrecerle ayuda para a resolver cualquier problema que pueda
                    tener con sus compras, así como para procesar los posibles
                    reembolsos.&nbsp;&nbsp;
                  </p>
                  <p>
                    También usaremos y analizaremos la información de las
                    transacciones de su cuenta para nuestro interés legítimo,
                    combinando datos o realizando análisis estadísticos, con el
                    fin de administrar, respaldar, mejorar y desarrollar nuestro
                    negocio, y para poder detectar y prevenir el fraude y otras
                    actividades ilegales, así como los actos prohibidos por
                    nuestras Condiciones de servicio o las políticas aplicables
                    a nuestros Productos.&nbsp;&nbsp;
                  </p>
                  <h4>(C) Información técnica y del dispositivo:</h4>
                  <p>
                    Analizamos la información sobre su forma de interactuar con
                    nuestros Productos para entender cómo los utiliza y
                    ofrecerle una experiencia de juego óptima, por ejemplo, con
                    actualizaciones de software que optimicen el rendimiento de
                    nuestros Productos.&nbsp;&nbsp; Utilizamos datos anónimos
                    para analizar y producir estadísticas relativas a los
                    hábitos, los patrones de uso y la información demográfica de
                    los usuarios como grupo y como individuos.&nbsp; Esto nos
                    permite ofrecerle un contenido personalizado, nos ayuda a
                    entender qué características de nuestros Productos le
                    interesan y nos permite gestionar la publicidad, entre otras
                    cosas.&nbsp;&nbsp;
                  </p>
                  <p>
                    Cuando interactúe con nuestros Sitios web o los visite,
                    recopilaremos automáticamente información sobre Usted, como
                    el tipo de navegador de Internet o el dispositivo móvil que
                    usa, cualquier sitio web desde el que haya llegado a
                    cualquiera de nuestros Productos, su dirección IP y su
                    sistema operativo, que nuestro servidor web reconoce de
                    manera automática.&nbsp;
                  </p>
                  <p>
                    Utilizamos los archivos de registro para seguir el tráfico
                    de nuestros Productos, solucionar problemas técnicos y
                    detectar y prevenir el fraude.&nbsp; Utilizamos estas
                    tecnologías para obtener información, por ejemplo, para
                    saber cuándo se abre un correo electrónico, o para
                    desarrollar estadísticas sobre la efectividad de la
                    publicidad o el marketing en nuestros Sitios web. En ciertos
                    casos, al trabajar con socios externos, utilizamos esta
                    información para enviarle anuncios de nuestros Productos,
                    basados en sus intereses.&nbsp;
                  </p>
                  <p>
                    También usamos información técnica y del dispositivo para
                    actuar y mejorar nuestros Productos, permitir el matchmaking
                    en línea, medir nuestra efectividad, establecer y mantener
                    cuentas, identificar y corregir errores, mantener el
                    contenido en línea seguro y resolver disputas
                    asociadas.&nbsp;&nbsp;
                  </p>
                  <h4>(D) Comentarios/encuestas/investigación de usuarios:</h4>
                  <p>
                    Utilizamos sus comentarios para responder a las dudas o
                    preguntas que tenga, para proporcionarle un servicio de
                    atención al cliente y para resolver problemas relacionados
                    con cualquiera de nuestros Productos. También publicaremos
                    las críticas que nos envíe sobre nuestros Productos y
                    analizaremos los comentarios con el fin de mejorar y
                    desarrollar los mismos.&nbsp; Competiciones Online FM también puede grabar el
                    sonido y la imagen de estas sesiones para que podamos
                    observar sus hábitos de juego y grabar sus reacciones.&nbsp;
                  </p>
                  <p>
                    Competiciones Online FM utiliza la información recopilada durante las encuestas
                    y sesiones de investigación de usuarios para ayudarnos a
                    adaptar y mejorar nuestros Productos.&nbsp;
                  </p>
                  <p>
                    Competiciones Online FM puede compartir datos de las sesiones de investigación
                    de usuarios con algunos socios externos cuando haya
                    requerimientos del negocio legítimos para ello. En tales
                    casos, sus datos siempre se anonimizarán por completo antes
                    de compartirse.&nbsp;
                  </p>
                  <h4>(E) Información de terceros:</h4>
                  <p>
                    Compartimos con terceros la información obtenida del uso que
                    Usted hace de nuestros Productos para proporcionarle una
                    experiencia óptima, facilitar el uso de dichos Productos
                    según se anuncian y permitirle jugar con estos en distintas
                    plataformas de juego.&nbsp;
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    Los Operadores de plataformas también nos refieren datos
                    sobre Usted y el uso que hace de nuestros Productos.&nbsp;
                    Dichos datos incluyen, entre otros:&nbsp;&nbsp;
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    (i) datos de compras, para que podamos hacer un seguimiento
                    de las ventas y el rendimiento de nuestros Productos;
                    y&nbsp;
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    (ii) datos de juego relacionados con las interacciones que
                    realice con nuestros Productos, incluidas las estadísticas
                    de rendimiento del jugador, acciones en el juego, opciones
                    de los personajes y otros datos de juego similares que nos
                    ayuden a mejorar determinados aspectos y funcionalidades de
                    nuestros Productos.&nbsp;
                  </p>
                  <p>&nbsp;&nbsp;</p>
                  <p>
                    Podemos usar tecnologías de estadísticas para vincular sus
                    actividades en línea, con el fin de ofrecerle anuncios
                    específicos.&nbsp; Por ejemplo, Valve (el Operador de
                    plataforma de descargas digitales de Steam) puede compartir
                    con nosotros ID de Steam seudonimizadas para ayudarnos a
                    optimizar nuestras ofertas y ayudarnos a entender cómo
                    utiliza Usted nuestros Productos. De nuevo, si Valve
                    comparte esta información personal con nosotros, lo hará de
                    manera conforme a su política de privacidad y la
                    configuración de privacidad de su cuenta de
                    Steam.&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    También trabajamos con redes publicitarias que ofrecen
                    anuncios en nuestros Productos, o en los sitios web y
                    productos de terceros. Algunos de estos anuncios pueden
                    adaptarse a sus intereses, basándose en su actividad y la
                    información técnica y/o datos de utilización que se
                    contienen en las cookies almacenadas en su dispositivo con
                    su consentimiento.&nbsp;&nbsp;
                  </p>
                  <p>
                    Actualmente, ciertos Productos están respaldados por socios
                    publicitarios externos que ofrecen anuncios ("Anunciantes
                    externos"), incluidos anuncios basados en conductas,
                    ubicaciones o intereses ("Anuncios basados en intereses"),
                    en nuestros Productos. Estos Anunciantes externos utilizan
                    tecnología para ofrecer los anuncios y vincularlos
                    directamente a nuestros Productos.&nbsp; Al hacer esto,
                    pueden recibir automáticamente el ID de su dispositivo, su
                    dirección IP o sus datos de geolocalización. También pueden
                    utilizar otras tecnologías (como cookies, JavaScript o
                    balizas web) para medir la efectividad de sus anuncios y
                    personalizar el contenido publicitario mostrado. Consulte
                    también nuestra{" "}
                    <a
                      href="https://www.Competiciones Online FM.es/cookiepolicy?_ga=2.205573459.1581263433.1602747257-1992687579.1602747257"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de cookies
                    </a>
                    <a href="/Competiciones Online FM-cookie-policy">.</a>
                  </p>
                  <p>
                    También podemos ofrecerle contenido publicitario en
                    determinados Productos, que tradicionalmente verá en un
                    entorno de juego en vivo, como la publicidad de perímetro en
                    un juego de fútbol. Por ejemplo, nuestro Producto "Football
                    Manager PC/Mac" está respaldado actualmente por Bidstack,
                    una plataforma que permite que los Anunciantes externos
                    ofrezcan de forma dinámica anuncios nativos en los
                    videojuegos.&nbsp;
                  </p>
                  <p>
                    Dentro de nuestros Productos también podemos proporcionar
                    funcionalidades que le permitan subir vídeos de las partidas
                    a YouTube. Si Usted opta por elegir esta característica,
                    recibiremos y guardaremos un token de autentificación de
                    Google para que la característica funcione de la manera
                    adecuada.&nbsp; El uso de esta funcionalidad queda sujeto a
                    los Términos y Condiciones del Servicio de YouTube:{" "}
                    <a
                      href="https://www.youtube.com/static?template=terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.youtube.com/static?template=terms
                    </a>
                    .&nbsp; En la Política de Privacidad de Google encontrará
                    más información sobre la protección de su privacidad:{" "}
                    <a
                      href="https://policies.google.com/privacy?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://policies.google.com/privacy?hl=es
                    </a>
                    . Mediante los ajustes de seguridad de Google también puede
                    ver y modificar los permisos dados:{" "}
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://myaccount.google.com/permissions
                    </a>
                    .&nbsp;
                  </p>
                  <h4>
                    (F) Información de fuentes disponibles públicamente en
                    línea:
                  </h4>
                  <p>
                    Utilizaremos y analizaremos estos datos para nuestro interés
                    legítimo con el fin de recopilar información sobre el uso
                    que Usted hace de nuestros Productos, cómo interactúa con
                    nuestras campañas de marketing y cómo valora la comunidad
                    nuestros Productos.&nbsp; Podemos utilizar estadísticas de
                    proveedores ajenos que recopilen estos datos en nuestro
                    nombre.&nbsp; Siempre que sea posible, nos aseguraremos de
                    que los datos personales que se recopilen para estos
                    propósitos sean anónimos.&nbsp;
                  </p>
                  <h4>
                    (G) Información sobre el uso que Usted hace de nuestros
                    Productos:
                  </h4>
                  <p>
                    Esta información nos permite seguir el rendimiento de
                    nuestros Productos, desarrollar nuevos Productos y
                    comunicarnos con nuestros socios y Operadores de
                    plataformas. Además, nos permite comprender mejor a los
                    usuarios y mejorar nuestros sistemas de publicidad,
                    segmentación y medición. Solo proporcionamos anuncios
                    adaptados si contamos con su consentimiento. Cualquier
                    información que usemos para informar y mejorar las
                    estrategias de negocio estará anonimizada por
                    completo.&nbsp;&nbsp;&nbsp;
                  </p>
                  <h4>(H) Competiciones:</h4>
                  <p>
                    Competiciones Online FM recopila y procesa estos datos únicamente con el
                    propósito de llevar a cabo y monitorizar la competición, así
                    como desempeñar actividades publicitarias relacionadas con
                    esta.&nbsp;&nbsp;
                  </p>
                  <p>
                    Guardaremos sus datos personales mientras dure la
                    competición y el periodo de tiempo necesario después de ello
                    para entregar los premios (si procede).
                  </p>
                  <h4>(I) Plug-ins de redes sociales:</h4>
                  <p>
                    Cuando se hayan compartido sus datos con la plataforma de
                    redes sociales (que hará las veces de controlador conjunto
                    de estos), sus interacciones con estas características se
                    verán sometidas a las políticas de privacidad de la
                    plataforma pertinente. Encontrará más información sobre
                    estas prácticas de privacidad en los enlaces
                    siguientes:&nbsp;
                  </p>
                  <p>
                    <a
                      href="https://www.facebook.com/about/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/about/privacy/
                    </a>
                    .&nbsp;
                  </p>
                  <p>
                    <a
                      href="https://twitter.com/es/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://twitter.com/es/privacy
                    </a>
                    .&nbsp;
                  </p>
                  <h4>(J) Tecnologías antitrampas y antipirateo:</h4>
                  <p>
                    Competiciones Online FM puede utilizar tecnologías antitrampas y antipirateo
                    para ayudarnos a detectar actividades ilegales o
                    malintencionadas y tomar las medidas apropiadas, de
                    detectarlas.&nbsp;
                  </p>
                  <p>
                    Las tecnologías antitrampas y antipirateo del Producto
                    pueden requerir la descarga de ciertos datos en el
                    dispositivo. Si deshabilita o intenta interferir con estas
                    tecnologías, el Producto podría no funcionar de manera
                    correcta y Usted estaría incumpliendo el Acuerdo de licencia
                    de usuario final.&nbsp;
                  </p>
                  <h4>(K)Software LiveOps:</h4>
                  <p>
                    Si juega a un Producto que utilice software LiveOps, ese
                    software de terceros recopilará ciertos datos personales
                    sobre Usted, según requiera el servicio. Estos datos
                    personales se procesarán y guardarán conforme a la política
                    de privacidad del tercero (tal y como se le notificará antes
                    de recopilar los datos, normalmente cuando el Producto se
                    inicia por primera vez).&nbsp;
                  </p>
                  <h4>
                    (L) Adquisición/Atribución de usuarios y público principal,
                    personalizado o similar
                  </h4>
                  <p>
                    Usamos varios métodos de marketing para adquirir nuevos
                    usuarios para nuestros Productos, al trabajar con una
                    variedad de socios externos para lanzar nuestras campañas de
                    marketing y ofrecer anuncios en sitios web externos y en las
                    plataformas de redes sociales. En este marco, podemos
                    compartir determinados datos con nuestros socios en la
                    adquisición y atribución de usuarios.
                  </p>
                  <p>
                    Si Usted ha dado su consentimiento a este tipo de marketing,
                    recibirá anuncios dirigidos cuando utilice Internet o juegue
                    con nuestros Productos (público personalizado).&nbsp; Otros
                    usuarios de estas plataformas que comparten intereses
                    similares con Usted pueden también recibir anuncios
                    dirigidos de nuestros Productos (público similar). Otros
                    usuarios pueden recibir anuncios sobre nuestros Productos en
                    función de su edad, ubicación, sexo e idioma (nuestro
                    público principal).&nbsp;&nbsp;
                  </p>
                  <p>
                    En la Política de privacidad del socio correspondiente
                    encontrará más información sobre la protección de su
                    privacidad. Puede deshabilitar las funciones de remarketing
                    a través de los siguientes enlaces:&nbsp;
                  </p>
                
                  <p>&nbsp;</p>
                  <p>
                    Tendrá que iniciar sesión en la plataforma social para
                    administrar sus preferencias de anuncios.&nbsp;
                  </p>
                  <p>
                    Solo recopilaremos y procesaremos datos personales sobre
                    Usted cuando tengamos bases legales para ello. Como se
                    indica a lo largo de esta Política de privacidad, las bases
                    legales incluyen el consentimiento (cuando Usted consiente,
                    por ejemplo, recibir correos de noticias y marketing), los
                    contratos (cuando el procesamiento es necesario para el
                    cumplimiento de un contrato suscrito con Usted [por ejemplo,
                    para proporcionarle los Productos que ha solicitado]) y los
                    "intereses legítimos".&nbsp;
                  </p>
                </div>
              </div>
             
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
