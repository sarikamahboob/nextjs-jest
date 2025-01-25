import Home from "@/components/Home";
import NotesApp from "@/components/NotesForm";
import TodoAndPhotoList from "@/components/TodoAndPhotoList";


export default function landing() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Home />
      <NotesApp />
      <TodoAndPhotoList />
    </div>
  );
}
