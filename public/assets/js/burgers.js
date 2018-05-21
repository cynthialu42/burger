$(function() { // shorthand for $(document).ready(function(){})
    $('.create-form').on("submit", function(event){
        event.preventDefault();
        var newBurger = {
            burgerName : $("#name").val().trim().toUpperCase()
        };


        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("Added burger");
            location.reload();
        });
    });

    $('.devour-it').on('click', function(event){

        var id = $(this).data("id");
        var newDevour = !$(this).data("newdevoured");
        console.log("id" + id);
        console.log("newDevour" + newDevour);
        var newDevouredState = {
            devoured: newDevour
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function(){
            console.log("Changed burger to " + newDevour);
            location.reload();
        });
    });
});