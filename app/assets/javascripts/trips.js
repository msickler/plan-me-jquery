$(document).ready(function(){
  attachListeners()
})


function formatCommentList(comments){
  var commentInfo = ""
  for (var i = 0; i < comments.length; i++) {
    let com = new Comment(comments[i]["id"],comments[i]["content"],comments[i]["trip"]["name"])
    commentInfo += com.formatComment() + " <button class='delete-comment' data='" + com.id + "' onclick='deleteComment(this)'>Delete</button></li>"
  }
  return commentInfo
}


function attachListeners(){
      $('form').submit(function(event){
      event.preventDefault()
      createNewComment(this)

    })

    $(".delete-comment").click(function(event){
      event.preventDefault()
      deleteComment(this)
    })
}


function deleteComment(element){
  var commentId = element.attributes["data"].value
  $.ajax({
    url: '/comments/' + commentId,
    type: 'DELETE',
    success: function(result){
      $("#comment-"+result["id"]).replaceWith("")
    }
  })
}

function createNewComment(element){
  var values= $(element).serialize()
  var triping = $.post('/comments', values)

  triping.done(function(comment) {

        var newComment = new Comment(comment.id, comment.content, comment.trip)

        var createdComment = newComment.formatComment() + " <button class='delete-comment' data='" + comment.id + "' onclick='deleteComment(this)'>Delete</button></li>"
        $("#comments").append(createdComment);

        $("#submit").prop( "disabled", false )
        $("#comment_content").val("")
      });

}


function Comment(id, content, trip){
  this.id = id
  this.content = content
  this.trip = trip
}

Comment.prototype.formatComment = function(){
    return "<li id='comment-"+ this.id +"'><strong>" + this.content + "</strong>"
  }
