export class CkeditorUploadAdapter {

  constructor(
    private loader: any
  ) {}

  upload(): Promise<{ default: string }> {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/api/uploads', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(result => {
            resolve({
              default: result.url // URL pública da imagem
            });
          })
          .catch(error => reject(error));
      });
    });
  }

  abort() {
    // opcional
  }
}