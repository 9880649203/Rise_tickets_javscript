
document.getElementById('issueInputForm').addEventListener('submit',saveIssues);

function saveIssues(e){
var issueDes = document.getElementById('issueDescInput').value;
var issueSev = document.getElementById('issueSeverityInput').value;
var issueAssigned = document.getElementById('issueAssignedToInput').value;
var issueId = chance.guid();
var IissueStatus = 'open';
console.log(issueDes,issueSev,issueId);

	var obj ={
		id:issueId,
		description:issueDes,
		serverty:issueSev,
		assigned:issueAssigned,
        status:IissueStatus
	}

	if(localStorage.getItem('issue') == null){
		var issues = [];
		issues.push(obj);
		localStorage.setItem('issue',JSON.stringify(issues));
	}
	else{
		issues = JSON.parse(localStorage.getItem('issue'));
		issues.push(obj);
		localStorage.setItem('issue',JSON.stringify(issues));
	}
document.getElementById('issueInputForm').reset();
fetchIssues();
  e.preventDefault();
};

function deleteIssue(id){
	var issue = JSON.parse(localStorage.getItem('issue'));

		for(var i =0;i<issue.length;i++){
			console.log(id)
			if(issue[i].id == id){
				issue.splice(i,1);
			}
		}
		localStorage.setItem('issue',JSON.stringify(issue));
		fetchIssues();
}

function issueOpen(id){
	var issue = JSON.parse(localStorage.getItem('issue'));
	for(var i =0;i<issue.length;i++){
		console.log(id)
		if(issue[i].id == id){
			issue[i].status = 'closed'
		}
	}
	localStorage.setItem('issue',JSON.stringify(issue));
	fetchIssues();
}

 function fetchIssues(){
var lists = document.getElementById('issuesList');
var issuesListe = JSON.parse(localStorage.getItem('issue'));
console.log(issuesListe);
lists.innerHTML = '';
if(issuesListe){
	for(var i=0;i<issuesListe.length;i++){
		var issueid = issuesListe[i].id;
		var des = issuesListe[i].description;
		var server = issuesListe[i].serverty;
		var assign = issuesListe[i].assigned;
		var stat = issuesListe[i].status;
	
	lists.innerHTML += '<div class="well">'+
						'<h1>issue id '+ issueid +'</h6>'+
						'<p><span class="label label-info">'+stat+'</span></p>'+
						'<h3>'+des+'</h3>'+
						'<p><span class="glyphicon glyphicon-time">'+ server+'</span></p>'+
						'<p><span class="glyphicon glyphicon-user">'+ assign+'</span></p>'+
						'<div style="display:inline-block">'+
						'<a href="#" onclick="issueOpen(\''+issueid+'\')" class="btn btn-warning" style="margin-right:10px">Close</a>'+
						'<a href="#" onclick="deleteIssue(\''+issueid+'\')" class="btn btn-danger">Delete</a>'+
						'<div>'
						'</div>	'
}
}


	

}