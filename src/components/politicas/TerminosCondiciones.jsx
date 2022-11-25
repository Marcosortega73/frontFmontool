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

export default function TerminosCondiciones({ open, setOpen }) {
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
          sx={{ backgroundColor: "primary.main",color:"#e5e5e5" }}
        >
          Terminos y condiciones
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{m:3}}>
          <span>
            {" "}
            Esta política de condiciones de uso es válida a partir del Nov 2022.
          </span>
          <br />
          <br />
          <h3>TÉRMINOS Y CONDICIONES — Competiciones Online FM </h3>
          <Typography gutterBottom variant="body2" sx={{ my: 1 }}>
            Competiciones Online FM, persona jurídica de derecho privado
            describe, a través de este documento, las normas de uso del sitio
            www.competicionesonlinefm.com y de cualquier otro sitio web, tienda
            o aplicación operada por el titular.
          </Typography>
          <Typography gutterBottom variant="body2">
            Al navegar por este sitio web, consideramos que está de acuerdo con
            las condiciones de uso que figuran a continuación.
          </Typography>
          <Typography gutterBottom variant="body2">
            Si no está de acuerdo con los términos de este acuerdo, le pedimos
            que no haga ningún otro uso de este sitio web, mucho menos que se
            registre o envíe sus datos personales.
          </Typography>
          <Typography gutterBottom variant="body2">
            Si cambiamos nuestras condiciones de uso, publicaremos el nuevo
            texto en este sitio web, con una fecha de revisión actualizada.
            Podemos modificar este documento en cualquier momento.
          </Typography>
          <Typography gutterBottom variant="body2">
            Si hay un cambio significativo en los términos de este acuerdo,
            podemos informarle utilizando la información de contacto que tenemos
            en nuestra base de datos o mediante una notificación.
          </Typography>
          <Typography gutterBottom variant="body2">
            El uso de este sitio web después de los cambios significa que usted
            acepta las condiciones de uso revisadas. Si, después de leer la
            versión revisada, no está de acuerdo con sus términos, por favor,
            termine su acceso.
          </Typography>
          <ul>
            <li style={{marginTop:"13px"}}>
             <strong>Sección 1 - Usuario</strong> 
              <p>
                {" "}
                El uso de este sitio web le otorga automáticamente la condición
                de Usuario e implica su plena aceptación de todas las
                directrices y condiciones incluidas en estas Condiciones.{" "}
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
             <strong>Sección 2 - Adhesión junto con la política de privacidad</strong> 
              <p>
                {" "}
                El uso de este sitio web implica la adhesión a estas Condiciones
                de Uso y a la versión más actualizada de la Política de
                Privacidad de Competiciones Online FM.
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
             <strong>Sección 3 - Condiciones de acceso</strong> 
              <p>
                En general, el acceso al sitio web de Competiciones Online FM es
                gratuito y no requiere registro previo. Sin embargo, para hacer
                uso de algunas funcionalidades, el usuario puede necesitar
                registrarse, creando una cuenta de usuario con un nombre de
                usuario y una contraseña de acceso. Es responsabilidad del
                usuario proporcionar únicamente información correcta, auténtica,
                válida, completa y actualizada, así como no revelar su nombre de
                usuario y contraseña a terceros. Algunas partes de este sitio
                web ofrecen al usuario la opción de publicar comentarios en
                determinadas áreas.Competiciones Online FM no consiente la
                publicación de contenidos de carácter discriminatorio, ofensivo
                o ilícito, o que infrinjan los derechos de autor o cualquier
                otro derecho de terceros. La publicación de cualquier contenido
                por parte del usuario de este sitio web, incluidos los mensajes
                y comentarios, implica una licencia no exclusiva, irrevocable e
                irreversible para su uso, reproducción y publicación por parte
                de Competiciones Online FM en su sitio web, plataformas de
                internet y aplicaciones, o incluso en otras plataformas, sin
                ninguna restricción o limitación.{" "}
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
             <strong> Sección 4 - Cookies</strong>
              <p>
                {" "}
                La información sobre el uso que usted hace de este sitio web
                puede recogerse a través de las cookies. Las cookies son piezas
                de información que se almacenan directamente en el equipo que
                está utilizando. Las cookies permiten recoger información como
                el tipo de navegador, el tiempo de permanencia en el sitio web,
                las páginas visitadas, las preferencias de idioma y otros datos
                de tráfico anónimos. Nosotros y nuestros proveedores de
                servicios utilizamos la información para la protección de la
                seguridad, para facilitar la navegación, mostrar la información
                de manera más eficiente y personalizar su experiencia al
                utilizar este sitio web, así como para el seguimiento en línea.
                También recopilamos información estadística sobre el uso del
                sitio web para mejorar continuamente nuestro diseño y
                funcionalidad, para entender cómo se utiliza el sitio web y para
                ayudarle a resolver problemas relevantes. Si no desea que se
                recoja su información a través de las cookies, existe un
                procedimiento sencillo en la mayoría de los navegadores que
                permite rechazar automáticamente las cookies, o le da la opción
                de aceptar o rechazar la transferencia de una cookie específica
                (o varias) de un sitio web concreto a su ordenador. Sin embargo,
                esto puede crear inconvenientes en su uso del sitio web. La
                configuración que elija puede afectar a su experiencia de
                navegación y al funcionamiento que requiere el uso de cookies.
                En este sentido, rechazamos cualquier responsabilidad por las
                consecuencias derivadas del funcionamiento limitado de este
                sitio web causado por la desactivación de las cookies en su
                dispositivo (incapacidad para establecer o leer una cookie).
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
             <strong>Sección 5 - Propiedad intelectual</strong> 
              <p>
                Todos los elementos de Competiciones Online FM son propiedad
                intelectual de la misma o de sus licenciantes. Estos términos o
                el uso del sitio web no le otorgan ninguna licencia o derecho de
                uso de los derechos de propiedad intelectual de Competiciones
                Online FM o de cualquier tercero.
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
              <strong>Sección 6 - Enlaces a sitios web de terceros</strong>
              <p>
                Este sitio web puede contener, de vez en cuando, enlaces de
                hipertexto que le redirigirán a sitios web de nuestros socios,
                anunciantes, proveedores, etc. Si hace clic en uno de estos
                enlaces a cualquiera de estos sitios, recuerde que cada sitio
                tiene sus propias prácticas de privacidad y que nosotros no
                somos responsables de estas políticas. Por favor, consulte esas
                políticas antes de enviar cualquier dato personal a esos sitios.
                No somos responsables de las políticas y prácticas de
                recopilación, uso y divulgación (incluidas las prácticas de
                protección de datos) de otras organizaciones, como Facebook,
                Apple, Google, Microsoft, o cualquier otro desarrollador de
                software o proveedor de aplicaciones, tienda de medios sociales,
                sistema operativo, proveedor de servicios de internet o
                fabricante de dispositivos, incluidos los Datos Personales que
                usted divulgue a otras organizaciones a través de las
                aplicaciones, en relación con dichas aplicaciones, o publicados
                en nuestras redes sociales. Le recomendamos que se informe sobre
                la política de privacidad y las condiciones de uso de cada sitio
                web visitado o proveedor de servicios utilizado.
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
              <strong>Sección 7 - Plazos y modificaciones</strong>
              <p>
                El funcionamiento de este sitio web es por tiempo indefinido. La
                totalidad del sitio web o cada una de sus secciones podrá ser
                cerrada, suspendida o interrumpida unilateralmente por
                Competiciones Online FM, en cualquier momento y sin previo
                aviso.
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
             <strong> Sección 8 - Datos personales</strong>
              <p>
                Durante el uso de este sitio web, ciertos datos personales serán
                recogidos y procesados por Competiciones Online FM y/o los
                Socios. Las normas relativas al tratamiento de los datos
                personales de Competiciones Online FM están estipuladas en la
                Política de Privacidad.
              </p>
            </li>
            <li style={{marginTop:"13px"}}>
              <strong>Sección 9 - Contacto</strong>
              <p>
                {" "}
                Si tiene alguna pregunta sobre las condiciones de uso, por favor
                póngase en contacto con nosotros por correo electrónico{" "}
                <strong>marcosortega73@hotmail.com</strong>
              </p>
            </li>
          </ul>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
