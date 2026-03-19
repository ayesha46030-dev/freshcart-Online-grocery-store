const Footer = () => (
  <footer className="bg-card border-t border-border py-12 px-6">
    <div className="container mx-auto text-center">
      <h3 className="font-heading text-2xl font-bold text-primary mb-2">La Maison</h3>
      <p className="font-body text-sm text-muted-foreground mb-6">Fine Dining & Culinary Excellence</p>
      <div className="divider-gold mx-auto mb-6" />
      <p className="font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} La Maison. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
