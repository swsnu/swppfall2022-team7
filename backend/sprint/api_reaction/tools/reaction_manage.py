from model_project.models import Comment, Reaction, UserProject, UserProjectActivity
from model_project.tools.activity_manage import push_activity
from api_user.tools.user_detail import get_image_path_of_user

def get_reaction_list_by_comment_id(comment_id): 
    comment = Comment.objects.get(id = comment_id)
    qs_reaction = Reaction.objects.filter(comment=comment).select_related('user')

    return [{
        "user": {
            "id": reaction.user.id,
            "username": reaction.user.username,
            "email": reaction.user.email,
            "image": get_image_path_of_user(reaction.user)
        },
        "created_at": reaction.created_at,
        "emoji": reaction.emoji
    } for reaction in qs_reaction]

def modify_reaction(comment_id, data: dict, user): 
    comment = Comment.objects.get(id = comment_id)
    task = comment.task
    qs_reaction = Reaction.objects.filter(comment=comment, user=user, emoji=data['emoji'])
    if qs_reaction.exists():
        qs_reaction.delete()
    else :
        reaction = Reaction.objects.create(
            comment=comment,
            user=user,
            emoji=data['emoji']
        )
        user_project = UserProject.objects.get(user=user, project=task.project)
        push_activity(user_project, task, UserProjectActivity.ActivityType.REACT_COMMENT, comment=comment)

    
    return