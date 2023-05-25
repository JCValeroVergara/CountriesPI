export default function validate({
   name,
   typeActivity,
   difficulty,
   duration,
   season,
   idPais,
}) {
var errors = {};

   if (name?.length === 0) errors.name = 'Activity Name is required';
   if (typeActivity?.length === 0)
      errors.typeActivity = 'Type Activity  is required';

   if (!duration) {
      errors.duration = 'Duration needs a time for activity';
   } else if (duration > 24 || duration < 1) {
      errors.duration = 'The duration needs a time no longer than 24 hours';
   } 


   if (difficulty > 5 || difficulty < 1)
      errors.difficulty = 'The difficulty must be between 1 and 5';
   if (season?.length === 0)
      errors.season = 'Activity Season is required';
   if (idPais?.length === 0)
      errors.idPais ='One or more countries are required to create the activity';

return errors;
}
