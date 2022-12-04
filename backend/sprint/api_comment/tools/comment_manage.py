from model_project.models import UserProject, Project, Task, Comment, UserProjectActivity
from model_project.tools.activity_manage import push_activity
from api_reaction.tools.reaction_manage import get_reaction_list_by_comment_id

def convert_comment_to_dict(comment: Comment): 
    return {
        "id": comment.pk,
        "writer": { "id": comment.user.id, "username": comment.user.username },
        "content": comment.content,
        "created_at": comment.created_at,
        "reaction_list": get_reaction_list_by_comment_id(comment.id)
    }

def get_comment_list_by_task_id(task_id: int): 
    task = Task.objects.get(id = task_id)
    qs_comment = Comment.objects.filter(task = task)

    ret = []

    for comment in qs_comment :
        comment: Comment
        ret.append(convert_comment_to_dict(comment))
    return ret

def create_new_comment(task_id: int, data: dict, user):
    task = Task.objects.get(id = task_id)
    comment = Comment.objects.create(
        task = task,
        content = data['content'],
        user = user
    )
    user_project = UserProject.objects.get(user= user, project=task.project)
    push_activity(user_project, task, UserProjectActivity.ActivityType.CREATE_COMMENT, comment=comment)
    return convert_comment_to_dict(comment)

def edit_comment(comment_id: int, data: dict): 
    comment = Comment.objects.get(id = comment_id)
    comment.content = data['content']
    comment.save()
    user_project = UserProject.objects.get(user=comment.user, project=comment.task.project)
    push_activity(user_project, comment.task, UserProjectActivity.ActivityType.EDIT_COMMENT, comment=comment)
    return convert_comment_to_dict(comment)

def delete_comment(comment_id: int): 
    Comment.objects.get(id = comment_id).delete()
    return