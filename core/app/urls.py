from django.urls import path
from .views import NoteDetailView, NoteListCreateView, SignupView, LoginView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("notes/", NoteListCreateView.as_view(), name="notes_list_create"),
    path("notes/<int:pk>/", NoteDetailView.as_view(), name="note_detail"),

   #path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   #path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]


