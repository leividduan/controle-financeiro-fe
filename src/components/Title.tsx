function Title({children}:any) {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
      {children}
    </h1>
  );
}

export default Title;