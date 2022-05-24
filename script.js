// Created by Nemonet   TYP💻

var nom, pof, def, ex, wrd;
function check() {
   $("#deflist").html("");
   $("#load").show(); $.getJSON("https://api.dictionaryapi.dev/api/v2/entries/en/"+$("input").val(), function(res) {
     $("#word span").html(res[0].word);
     $("#word #txt").html(res[0].phonetics[0].text);
     ml = res[0].meanings.length;
     $("audio").attr("src", res[0].phonetics[0].audio);
     for (i=0; i<ml;i++) {
        var r=res[0].meanings[i].definitions[0];
        pof ="<span id='pof'>"+ res[0].meanings[i].partOfSpeech+"</span>";
        def ="<span id='df'>"+ r.definition+ "</span>";
        ex = r.example;
        $("#load").hide();
        if (ex!=undefined) {
           ex ="<span id='ex'>"+r.example+ "</span>";
           ex = ex.replace(res[0].word, `<span style='color:yellow;'>${res[0].word}</span>`);
           $("#deflist").append(`<div id="def">
           ${res[0].word} (${pof}) <hr>Definition:<br>${def}<hr> Example:  ${ex}</div>`);
        }
        else {
           $("#deflist").append(`<div id="def">
           ${res[0].word} (${pof}) <hr>Definition:<br>${def}</div>`);
        }
           $("input").val("");
     }
   });
}

function play() {
   var aud = document.getElementById("prc");
   if ($("audio").attr("src")!=undefined) {
      if (aud.duration > 0 && !aud.paused) {
         aud.pause();
         $("#pps").html("Play");
         $("i").attr("class", "fa fa-play");
      }
      else {
         aud.play();
         $("#pps").html("Pause");
         $("i").attr("class", "fa fa-pause");
      }
   }
   aud.onended = function() {
      $("i").attr("class", "fa fa-play");
   }
}
