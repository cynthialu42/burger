$(function() { // shorthand for $(document).ready(function(){})
    $('.create-form').on("submit", function(event){
        event.preventDefault();
        var newBurger = {
            burgerName : $("#name").val().trim()
        };


        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("Added burger");
            location.reload();
        });
    });
});