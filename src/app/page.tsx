export default async function Page() {

  async function addToDo(formData: FormData) {
    "use server";

    const todo = formData.get("todo");

    console.log({ todo, cookies });
  }

  return (
    <section className="py-10">
      <div className="container">
        <div className="max-w-[700px] mx-auto">
          <form action={addToDo} className="grid grid-cols-1 gap-7">
            <div className="col-span-1 space-y-1">
              <div className="text-sm md:text-base text-gray-600 font-medium sentence">product name *</div>
              <textarea
                rows={5}
                name="todo"
                className="p-2 resize-none border border-gray-300 rounded block w-full"></textarea>
            </div>
            <div className="col-span-1">
              <input
                type="submit"
                name="submit"
                value="add todo"
                className="py-3 px-10 font-bold cursor-pointer bg-gray-800 capitalize rounded text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}