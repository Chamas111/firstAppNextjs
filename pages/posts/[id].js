export default function AlbumsDetails(props) {
  return (
    <div className="relative isolate px-6 pt-20 mt-10 lg:px-7">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl mb-5">
        Title:
      </h2>
      <p>{props.post.title}</p>

      <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl mt-5 mb-5">
        Description:
      </h2>
      <p>{props.post.body}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const data = await res.json();

  return {
    props: {
      post: data,
    },
  };
}
