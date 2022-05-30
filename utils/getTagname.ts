const getTagname = () => {
  const tagname: string | null = localStorage.getItem("nickname");

  if (tagname) {
    return tagname;
  }
};

export default getTagname;
