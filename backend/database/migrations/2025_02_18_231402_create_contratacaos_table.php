public function up()
{
    Schema::create('contratacoes', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->string('artista');
        $table->decimal('cache', 8, 2);
        $table->date('data_evento');
        $table->string('endereco');
        $table->timestamps();
    });
}