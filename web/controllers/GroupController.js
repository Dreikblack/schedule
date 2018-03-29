class GroupController 
{
    getGroupAll()
    {
       var groupService = new GroupService();
       return groupService.getGroupAll();
    }
    
    getGroupAllViewButton()
    {
        var groups = this.getGroupAll();
        var groupsView=document.getElementById("groups");
        var result="";
        for(var i=0; i<groups.length;i++)
        {
             result+= "<div class='row'>\n\
            <div onclick='groupClick("+ groups[i].id+")' class='btn btn-default col-md-12'  >"
                    +groups[i].name+
            "</div></div>";
        }
        groupsView.innerHTML = result;
    }
   
    
    getGroupAllViewList() 
    {
        
        var groups = this.getGroupAll();
        var groupsView=document.getElementById("groups");
        var result="";
        for(var i=0; i<groups.length;i++)
        {
            result+= "<div class='row'>\n\
            <div class='alert alert-success'>"+groups[i].name+
            "</div></div>";
        }
        groupsView.innerHTML = result;
    }
    
     getGroupAllViewSelect() 
    {    
        
        var groups = this.getGroupAll();
        var groupsView=document.getElementById("groups");
        
        var result="<select id='group'>";
        for(var i=0; i<groups.length;i++)
        {
            
            result+= "<option>"+groups[i].name+"</option>";
        }
        result+="</select>";
        groupsView.innerHTML = result;
    }

    
    getLessonByIdGroup(id)     {
        var groupService = new GroupService();
        return groupService.getLessonByIdGroup(id);
    }
    
    getGroupById(id)     {
        var groupService = new GroupService();
        return groupService.getGroupById(id);
    }
    
    getLessonByIdGroupViewList(id)    {
        var lesson = this.getLessonByIdGroup(id);
        var group = this.getGroupById(id);
        var trainerService = new TrainerService();
        var lessonView=document.getElementById("lesson");
        var result="<div class='well'>"+group.name+ ". Место проведения занятия: "+group.place+"</div>";
        lesson = lesson.sort(function(a,b) {return a.day-b.day;});
        var prevDay = -1;
        for(var i=0; i<lesson.length;i++)
        {
            var id = lesson[i].id;
            var day = lesson[i].day;
            var timeStart=lesson[i].timeStart;
            var timeEnd=lesson[i].timeEnd;
            var idTrainer=lesson[i].idTrainer; 
            var trainer = trainerService.getTrainerById(idTrainer);
            var trainerName = trainer.name;
            if (prevDay !== day)
            {
                if (i !== 1)
                {
                    result += "</tbody></table></div>";
                }
                result += "<div class='panel panel-default'><div class='panel-heading'>"
                +getDay(day)+
                "</div><table class='table'><thead><tr><th>Время занятия</th><th>Тренер</th></thead><tbody><tr><td>"
                +timeStart+"-"+timeEnd + "</td><td>"+trainerName+"</td></tr>";
            }
            else
            {
                result += "<tr><td>"+timeStart+"-"+timeEnd +  "</td><td>"+trainerName+"</td></tr>";
            }
            prevDay = day;
        }
        if (lesson.length > 0)
        {
            result += "</tbody></table></div>";
        }
        lessonView.innerHTML = result;
    }
    
 getLessonByIdGroupViewButtonList(id)    {
        var lesson = this.getLessonByIdGroup(id);
        var trainerService = new TrainerService();
        var lessonView=document.getElementById("lesson");
        var result="";
        result+= "<div class='row'><div onclick='addLessonClick()' class='btn btn-default col-md-12'>Добавить занятие</div></div>";
        lesson = lesson.sort(function(a,b) {return a.day-b.day;});
       
        for(var i=0; i<lesson.length;i++)
        {
            var id = lesson[i].id;
            var day = getDay(lesson[i].day);
            var time=lesson[i].timeStart+"-"+lesson[i].timeEnd;
            var idTrainer=lesson[i].idTrainer;
            var trainer = trainerService.getTrainerById(idTrainer);
            var trainerName=trainer.name;; 
             result+= "<div class='row'>\n\
            <div onclick='lessonClick("+ lesson[i].id+")' class='btn btn-default col-md-8'>"
                    +day+". Время: "+time+". Тренер: "+trainerName+"</div>\n\
<div onclick='editLessonClick("+ lesson[i].id+")' class='btn btn-default col-md-2'>Редактировать</div>\n\
<div onclick='deleteLessonClick("+ lesson[i].id+")' class='btn btn-default col-md-2'>Удалить</div></div>";
        }
        lessonView.innerHTML = result;
    }
}

function getDay(idDay)
    {
        var Days = ["Понедельник","Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        if (idDay<7)
            return Days[idDay];
        else 
            return Days[0];
    }