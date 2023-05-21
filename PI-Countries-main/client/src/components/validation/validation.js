export default function validate({
  name,
  typeActivity,
  difficulty,
  duration,
  season,
  idPais,
}) {
  var errors = {};

  if (name?.length === 0) errors.name = 'Se necesita el nombre de la actividad';
  if (typeActivity?.length === 0)
    errors.typeActivity = 'Se necesita el Tipo de actividad';
  
   if (!duration) {
     errors.duration = 'La duración necesita un tiempo para la actividad';
   } else if (duration > 24 || duration < 1) {
     errors.duration = 'La duración necesita un tiempo no mayor a 24 horas';
   } 
  
  
  if (difficulty > 5 || difficulty < 1)
    errors.difficulty = 'La dificultad debe ser entre 1 y 5';
  if (season?.length === 0)
    errors.season = 'Se necesita la temporada de la actividad';
  if (idPais?.length === 0)
    errors.idPais = 'Se necesitan uno o más países para crear la actividad';

  return errors;
}
