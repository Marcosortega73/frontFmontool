import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export function RadarChart({
  habilidadesFisicas,
  habilidadesTecnicas,
  habilidadesMentales,
}) {


  const [defensa, setDefensa] = React.useState(0);
  const [ataque, setAtaque] = React.useState(0);
  const [velocidad, setVelocidad] = React.useState(0);
  const [vision, setVision] = React.useState(0);
  const [tecnica, setTecnica] = React.useState(0);
  const [aereo, setAereo] = React.useState(0);
  const [mental, setMental] = React.useState(0);
  const [fisico, setFisico] = React.useState(0);

  React.useEffect(() => {
    obtenerHabilidadesPromedios();
  }, [habilidadesFisicas, habilidadesMentales, habilidadesTecnicas]);

  const obtenerHabilidadesPromedios = () => {
    let defensa = 0;
    let ataque = 0;
    let velocidad = 0;
    let vision = 0;
    let tecnica = 0;
    let aereo = 0;
    let mental = 0;
    let fisico = 0;

    if (
      habilidadesFisicas.length > 0 &&
      habilidadesTecnicas.length > 0 &&
      habilidadesMentales.length > 0
    ) {
      //unir todo en un array
      let habilidades = habilidadesFisicas.concat(
        habilidadesTecnicas,
        habilidadesMentales
      );
      habilidades.forEach((habilidad) => {
        switch (habilidad?.nombre.toUpperCase()) {
          case "AGILIDAD":
            fisico += habilidad.valor;
            break;
          case "EQUILIBRIO":
            fisico += habilidad.valor;
            break;
          case "RESISTENCIA":
            fisico += habilidad.valor;
            break;
          case "FUERZA":
            fisico += habilidad.valor;
            break;
          case "ACELERACIÓN":
            velocidad += habilidad.valor;
            break;
          case "VELOCIDAD":
            velocidad += habilidad.valor;
            break;
          case "MARCAJE":
            defensa += habilidad.valor;
            break;
          case "ENTRADAS":
            defensa += habilidad.valor;
            break;
          case "COLOCACIÓN":
            defensa += habilidad.valor;
            break;
          case "PASES":
            vision += habilidad.valor;
            break;
          case "TALENTO":
            vision += habilidad.valor;
            break;
          case "VISIÓN":
            vision += habilidad.valor;
            break;
          case "REMATE":
            ataque += habilidad.valor;
            break;
          case "SERENIDAD":
            ataque += habilidad.valor;
            break;
          case "DESMARQUES":
            ataque += habilidad.valor;
            break;
          case "REGATE":
            tecnica += habilidad.valor;
            break;
          case "CONTROL":
            tecnica += habilidad.valor;
            break;
          case "TÉCNICA":
            tecnica += habilidad.valor;
            break;
          case "CABECEO":
            aereo += habilidad.valor;
            break;
          case "SALTO":
            aereo += habilidad.valor;
            break;
          case "ANTICIPACIÓN":
            mental += habilidad.valor;
            break;
          case "VALENTÍA":
            mental += habilidad.valor;
            break;
          case "CONCENTRACIÓN":
            mental += habilidad.valor;
            break;
          case "DECISIONES":
            mental += habilidad.valor;
            break;
          case "DETERMINACIÓN":
            mental += habilidad.valor;
            break;
          case "JUEGO EN EQUIPO":
            mental += habilidad.valor;
            break;
          default:
            break;
        }
      });

        setDefensa(defensa / 3);
        setAtaque(ataque / 3);
        setVelocidad(velocidad / 2);
        setVision(vision / 3);
        setTecnica(tecnica / 3);
        setAereo(aereo / 2);
        setMental(mental / 6);
        setFisico(fisico / 4);
        

      console.log("habitualidades", habilidades);
    }
  };


  const data = {
    labels: ["Defensa", "Ataque", "Velocidad", "Visión", "Técnica", "Aéreo", "Mental", "Físico"],
    datasets: [
      {
        label: "Habilidades",
        data: [defensa, ataque, velocidad, vision, tecnica, aereo, mental, fisico],
        backgroundColor: "rgba(204, 165, 0, 0.64)",
        borderColor: "#CCA700",
        borderWidth: 1,
      },
    ],
  };
  return <Radar width={500} redraw data={data} sx={{backgroundColor:"red"}} />;
}
