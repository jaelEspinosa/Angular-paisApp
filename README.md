# PaisesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Proceso para automatizar en build para githubPages(package.json):

- crear el script : "build:href":"ng build --base-href ./"
- instalar: npm install del-cli --save-dev
- instalar: npm install copyfiles --save-dev
- Agregar estos cos sripts al package.json:

    - "delete:docs": "del docs",
    - "copy:dist":"copyfiles dist/*/* ./docs -f"
    
- Por ultimo creamos el siguiente sript:

    - "build:github":"npm run delete:docs && npm run build:href && npm run copy:dist"

- Ejecutar el sript 'npm run build:github'.
    
```
 De esta manera tenemos automatizado el proceso, nos genera un build con la base url './' nos borra el archivo,
 'docs' que podria existir previamente y nos copia el nuevo build generado el la una carpeta nueva 'docs'. Ya solo
 queda hacer push en nuestro repositorio y listo, ya estaria actualizado el despliegue en githubPages. 
```
