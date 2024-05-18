let muscles = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];

let muscle = muscles[0]

let workoutList = [];

let savedWorkouts = [];

class EventListener {
    constructor(type, listener) {
        this.type = type;
        this.listener = listener;
    }
}

class Workout{
    constructor(workout) {
        this.name = workout.name;
        this.type = workout.type;
        this.muscle = workout.muscle;
        this.equipment = workout.equipment;
        this.difficulty = workout.difficulty;
        this.instructions = workout.instructions;

        this.eventListeners = [];
        this.clicked = false;
        this.addEventListener("click", () => {
            this.clicked = !this.clicked;
            if(this.clicked) {
                this.save();
            }
            else {
                this.unsave();
            }

        });

    }

    addEventListener(type, listener) {
        this.eventListeners.push(new EventListener(type, listener));
    }

    renderHtmlElement() {
        let workoutListing = document.createElement("div");
        workoutListing.setAttribute("id", this.name);
        workoutListing.setAttribute("class", "workoutListing");

        let name = document.createElement("div");
        name.setAttribute("id", this.name+"_name");
        name.setAttribute("class", "name");
        name.innerHTML = this.name;

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
                console.log("dang");
        }

        /*let muscle = document.createElement("div");
        muscle.setAttribute("id", this.name+"_muscle");
        muscle.setAttribute("class", "muscle");
        muscle.innerHTML = this.muscle;
        workoutListing.appendChild(muscle);*/

        let equipment = document.createElement("div");
        equipment.setAttribute("id", this.name+"_equipment");
        equipment.setAttribute("class", "equipment");
        equipment.innerHTML = this.equipment;

        let instructions = document.createElement("div");
        instructions.setAttribute("id", this.name+"_instructions");
        instructions.setAttribute("class", "instructions");
        instructions.innerHTML = this.instructions;

        workoutListing.appendChild(name);
        workoutListing.appendChild(difficulty);

        workoutListing.appendChild(type);
        workoutListing.appendChild(equipment);
        workoutListing.appendChild(instructions);

        this.eventListeners.forEach((element) => {workoutListing.addEventListener(element.type, element.listener)});

        return workoutListing;
    }

    save() {
        savedWorkouts.push(this);
        console.log(savedWorkouts);
        document.getElementById(this.name).classList.add("selected");
        sendData();
    }

    unsave() {
        savedWorkouts.splice(savedWorkouts.indexOf(this), 1);
        console.log(savedWorkouts);
        document.getElementById(this.name).classList.remove("selected");
        sendData();
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
        sendData();
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
    data: JSON.stringify({ 'List': savedWorkouts}), 
    success: console.log("Success"), 
    error: function(error) { 
      console.log("You got an error");
        console.log(error); 
    } 
}); 
}