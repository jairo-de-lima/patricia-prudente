const Footer = () => {
  return (
    <footer className="stick mb-0 mt-2 w-full bg-secondary p-1 text-sm">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} J&J Company. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
