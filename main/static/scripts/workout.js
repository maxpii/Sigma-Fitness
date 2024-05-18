let muscle = 'biceps'

let workoutList = [];

class Workout{
    constructor(workout) {
        this.name = workout.name;
        this.type = workout.type;
        this.muscle = workout.muscle;
        this.equipment = workout.equipment;
        this.difficulty = workout.difficulty;
        this.instructions = workout.instructions;
    }

    renderHtmlElement() {
        let workoutListing = document.createElement("div");
        workoutListing.setAttribute("id", this.name);
        workoutListing.setAttribute("class", "workoutListing");
        workoutListing.innerHTML = this.name;

        let type = document.createElement("div");
        type.setAttribute("id", this.name+"_type");
        type.setAttribute("class", "type");
        type.innerHTML = this.type;

        let difficulty = document.createElement("div");
        difficulty.setAttribute("id", this.name+"_difficulty");
        difficulty.setAttribute("class", "difficulty");
        switch (this.difficulty) {
            case 'beginner':
                difficulty.innerHTML = "😅";
                break;
            case 'intermediate':
                difficulty.innerHTML = "😰";
                break;
            case 'expert':
                difficulty.innerHTML = "🥵";
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
        workoutListing.appendChild(difficulty);

        
        let muscle = document.createElement("div");
        muscle.setAttribute("id", this.name+"_muscle");
        muscle.setAttribute("class", "muscle");
        muscle.innerHTML = this.muscle;
        workoutListing.appendChild(muscle);

        sendData();
        return workoutListing;
    }
}

//alexvega20137@gmail.com
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: { 'X-Api-Key': 'geZ3QPLwH+4shB5AbNk7CA==dJWU6rizbfyG8PAl'},
    contentType: 'application/json',
    success: function(result) {
        /*required segment start*/
        //result is an array of workout objects
        result.forEach((element) => {
            console.log(element);
            workoutList.push(new Workout(element));
        });
        workoutList.forEach((element) => {
            document.body.appendChild(element.renderHtmlElement());
        });
        /*required segment end*/
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


function sendData(){
$.ajax({ 
    url: '/process', 
    type: 'POST', 
    contentType: 'application/json', 
    data: JSON.stringify({ 'List': workoutList}), 
    success: console.log("Success"), 
    error: function(error) { 
      console.log("You got an error");
        console.log(error); 
    } 
}); 
}