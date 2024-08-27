# Documentação API

## Método GET

<div align="center">
    <img src="../imgs/GET.png">
</div>

## Método POST

<div align="center">
    <img src="../imgs/POST.png">
</div>

## Método PUT

<div align="center">
    <img src="../imgs/PUT.png">
</div>

 - **Observação:** foi necessário trocar a linha em livroRutes.js:
 ```
 router.path('/:id', livroController.atualizarLivro);
 ```
 para:
  ```
 router.put('/:id', livroController.atualizarLivro);
  ```

## Método DELETE

<div align="center">
    <img src="../imgs/DELETE.png">
</div>

 - **Observação:** foi necessário trocar a linha em livroController.js:
 ```
 await livro.remove();
 ```
 para:
  ```
 await livro.deleteOne();
  ``` 
