import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

const getProducts = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

export async function GET() {
  return Response.json(getProducts(), { status: 200 });
}

export async function POST(req) {
  const { name, price } = await req.json();
  const products = getProducts();
  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return Response.json(newProduct, { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let products = getProducts().filter((product) => product.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return Response.json({ message: "Produit supprimé" }, { status: 200 });
}

export async function PUT(req) {
  const { id, name, price } = await req.json();
  let products = getProducts();
  const index = products.findIndex((product) => product.id === parseInt(id, 10));
  if (index === -1) {
    return Response.json({ message: "Produit non trouvé" }, { status: 404 });
  }
  products[index] = { ...products[index], name, price };
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return Response.json(products[index], { status: 200 });
}
