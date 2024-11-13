import { createClient } from '@supabase/supabase-js';

const supabase = 
  createClient('https://minhaurl', 
      'minhaAPIKey')

export class ProductsController {

  async index(request, response) {
    const {data, error} = await supabase
    .from('products')
    .select()
    response.send(data);
    console.log(`lists all products${data}`);
  }

  async show (request, response){
    const { id } = request.params;

    console.log("id = " + id);

    const {data, error} = await supabase
      .from('products')
      .select()
      .eq('id', id)
    response.send(data);

    console.log("retorno "+ data);
  }

  async create(request, response){
    const { name, description, price } = request.body;

    const { error } = await supabase
    .from('products')
    .insert({
      name: name,
      description: description,
      price: price,
    })
    if (error) {
      response.send(error);
    }
    response.send("created!!");

    console.log("retorno "+ name);
    console.log("retorno "+ description);
    console.log("retorno "+ price);
  }

  async update(request, response){
    const {id} = request.params;
    const { name, description, price } = request.body;

    const {error} = await supabase
      .from('products')
      .update({
        name: name,
        description: description,
        price: price
      })
      .eq('id', id)
    if (error) {
      response.send(error);
    }

    response.send("updated!!");
  }

  async remove(request, response){
    const {id} = request.params;

    const {error} = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) {
      response.send(error);
    }
    response.send("deleted!!")

    console.log("delete:", id);
  }
}