export class IDNConstants {

  public static readonly colors: any = {
    red: {
      primary: 'rgb(155, 25, 51)',
      secondary: '#fff',
    },
    yellow: {
      primary: 'rgba(254,208,73)',
      secondary: 'rgba(254,208,73,.5)',
    },
    blue: {
      primary: 'rgb(0, 66, 90)',
      secondary: 'rgb(0, 66, 90,.5)',
    },
    orange: {
      primary: '#ff9500',
      secondary: '#ff9500',
    },
    green: {
      primary: 'rgb(31, 138, 112)',
      secondary: 'rgb(31, 138, 112,.5)',
    },
    gray: {
      primary: '#6c757d',
      secondary: '#e9ecef',
    },
  };

  public static rangeYears() {
    const anios: any[] = [];
    for (let i = 1950; i < 2040; i++) {
      anios.push(i);
    }
    return anios;
  }

  public static readonly IGLESIAS: string[] = [
    'CALLIRPA', 'CHAPICHAPINI', 'ROSAPATAYARIBAY', 'TOMATA', 'TOPOHOCO', 'TUMARAPI',// ZONA ANDINA PACAJES
    'CAQUIAVIRI', 'COLQUE ALTA', 'CHIPANAMAYA', 'LLIMPHI', 'LACALACA', 'LAURA AFETUNI', // ZONA CAQUIAVIRI
    'BAJO PANPAHASI', 'BUENOS AIRES', 'CENTRAL LA PAZ', 'EL BUEN PASTOR', 'KOINONIA', 'LA PORTADA',
    'MEMORIAL WINCHESTER', 'MIRAFLORES', 'MUNAYPATA', 'PASANKERI', 'VILLA FÁTIMA', 'ESCOBAR URIA',
    'PLAYA VERDE', 'SOPOCACHI BAJO', 'CHINCHAYA', 'CIUDADELA FERROVIARIA', // ZONA NORTE
    'ARANJUEZ', 'AVIRCATO', 'BELLA VISTA', 'CODAVISA', 'COTA COTA', '23 DE MARZO', 'MARQUIRIVI', // ZONA SUR
    'ANTARANI', 'BOTIJLACA', 'CANTUYO', 'COMANCHE', 'KELLAKELLA BAJA', 'JEKERI', 'ROSAPATA DE TULI', 'KELLAKELLA ALTA', // ZONA COMANCHE
    'CHULLUNKHAYANI', 'CONIRI', 'HILATA SAN JORGE', 'IRPUMA', 'VIACHA', 'COLQUENCHA', ' NUEVA TILATA 3',
    'TONCOPUJIO', 'MARISCAL SANTA CRUZ', // ZONA VIACHA
    'COHONI', 'TACACHÍA', 'QUILIHUAYA', // ZONA ILLIMANI
    'CALARI', 'COROCORO', 'GENERAL PANDO', 'PUTUNI', 'TUPALTUPA', 'TOTORANI', 'SICUIPATA', // ZONA MINERA
    'CALASAYA', 'CRUCERO', 'PATACAMAYA', 'CALTECA', 'CALACACHI', 'TOLOMA', // ZONA PATACAMAYA TAMBO QUEMADO
    'FE EN CRISTO', 'FILADELFIA', 'NUEVA VIDA', 'SHADDAI', 'LEUQUE', 'ALTO MUNAYPATA', 'IROCOTA'
    ].sort();
    // total iglesias 77


    public static readonly ZONAS: string[] = ['CIUDAD NORTE', 'CIUDAD CENTRAL', 'CIUDAD SUR', 'MINERA', 'VIACHA', 'ZONA PACAJES', 'COMANCHE', 'TAMBO QUEMADO', 'CAQUIAVIRI', 'SUCRE'];
    // total zonas 10
    public static readonly DIAS: string[] = ['SABADO', 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    // numeros.sort(function(a, b){return a - b});

    public static readonly AREAS: any[] = [
      { area: 'Ministro de Educación Cristiana', sigla: 'CED' },
      { area: 'Capellán', sigla: 'CHP' },
      { area: 'Asignación Distrital', sigla: 'DA-A' },
      { area: 'Asignación Distrital Interino', sigla: 'DIA-A' },
      { area: 'Superintendente de Distrito', sigla: 'DS-S' },
      { area: 'Educación', sigla: 'EDU' },
      { area: 'Servicio de Evangelismo, juvilado', sigla: 'ESR' },
      { area: 'Evangelista, Comisionado', sigla: 'EVC' },
      { area: 'Evangelista, Registrado', sigla: 'EVR' },
      { area: 'Evangelista, Permanente', sigla: 'EVT' },
      { area: 'Asignación a la Iglesia General', sigla: 'GA-A' },
      { area: 'Sin Asignación', sigla: 'U' },
      { area: 'Superintendente General', sigla: 'GS' },
      { area: 'Pastor', sigla: 'PAS' },
      { area: 'Servicio Pastoral, Tiempo Parcial', sigla: 'PSV-PT' },
      { area: 'Servicio Pastoral, Tiempo Completo', sigla: 'PSV-FT' },
      { area: 'Jubilado, Con Asignación', sigla: 'RA' },
      { area: 'Jubilado, Sin Asignación', sigla: 'RU' },
      { area: 'Evangelista de Música, Comisionado', sigla: 'SEC' },
      { area: 'Evangelista de Música, Registrado', sigla: 'SER' },
      { area: 'Servicio Especial /Interdenominacional', sigla: 'SPC' },
      { area: 'Estudiante', sigla: 'STU' },
      { area: 'En Proceso de Transferencia', sigla: 'TRF' },
    ].sort((a:any, b:any)=>{
      if ( a.area.toLowerCase() < b.area.toLowerCase()){
        return -1;
      }
      if ( a.area.toLowerCase() > b.area.toLowerCase()){
        return 1;
      }
      return 0;
    });


    public static readonly MINISTERIOS: any = [
      {
        sigla: 'JNI',
        nombre: 'Juventud Nazarena Internacional',
        bgcolor: '#118ab2',
        textcolor: 'white',
        pathLogo: 'https://res.cloudinary.com/duu9333ux/image/upload/v1682359338/jnilogo.png',
        url: '',
        idSeccion: ''
      },
      {
        sigla: 'MNI',
        nombre: 'Misiones Nazarenas Internacionales',
        bgcolor: '#ffd166',
        textcolor: '#2b2d42',
        pathLogo: 'https://res.cloudinary.com/duu9333ux/image/upload/v1682359338/mnilogo.png',
        url: '',
        idSeccion: ''
      },
      {
        sigla: 'DNI',
        nombre: 'Discipulado Nazareno Internacional',
        bgcolor: '#073b4c',
        textcolor: '#dfdfdf',
        pathLogo: 'https://res.cloudinary.com/duu9333ux/image/upload/v1682359338/dnilogo.png',
        url: '',
        idSeccion: ''
      }
    ];

    public static readonly ARTICLES: any = [
      {
        name: 'I. El Dios trino',
        text: 'Creemos en un solo Dios eternamente existente e infinito, Creador y Sustentador Soberano del universo; que sólo Él es Dios, santo en naturaleza, atributos y propósito. El Dios, quien es amor santo y luz, es trino en su ser esencial, revelado como Padre, Hijo y Espíritu Santo.',
        cites: '(Génesis 1; Levítico 19:2; Deuteronomio 6:4-5; Isaías 5:16; 6:1-7; 40:18-31; Mateo 3:16-17; 28:19-20; Juan 14:6-27; 1 Corintios 8:6; 2 Corintios 13:14; Gálatas 4:4-6; Efesios 2:13-18, 1 Juan 1:5; 4:8).'
      },
      {
        name: 'II. Jesucristo',
        text: 'Creemos en Jesucristo, la Segunda Persona de la Divina Trinidad; que Él eternalmente es uno con el Padre; que se encarnó por obra del Espíritu Santo y que nació de la virgen María, de manera que dos naturalezas enteras y perfectas, es decir, la deidad y la humanidad, fueron unidas en una persona, verdadero Dios y verdadero hombre, el Dios-hombre. Creemos que Jesucristo murió por nuestros pecados, y que ciertamente se levantó de entre los muertos y tomó otra vez su cuerpo, junto con todo lo perteneciente a la perfección de la naturaleza humana, con el cual ascendió al cielo y está allí intercediendo por nosotros.',
        cites: '(Mateo 1:20-25; 16:15-16; Lucas 1:26-35; Juan 1:1-18; Hechos 2:22-36; Romanos 8:3, 32-34; Gálatas 4:4-5; Filipenses 2:5 11; Colosenses 1:12-22; 1 Timoteo 6:14-16; Hebreos 1:1-5; 7:22-28; 9:24-28; 1 Juan 1:1-3; 4:2-3, 15).'
      },
      {
        name: 'III. El Espíritu Santo',
        text: 'Creemos en el Espíritu Santo, la Tercera Persona de la Divina Trinidad, que está siempre presente y eficazmente activo en la Iglesia de Cristo y juntamente con ella, convenciendo al mundo de pecado, regenerando a los que se arrepienten y creen, santificando a los creyentes y guiando a toda verdad la cual está en Jesucristo.',
        cites: '(Juan 7:39; 14:15-18, 26; 16:7-15; Hechos 2:33; 15:8-9; Romanos 8:1-27; Gálatas 3:1-14; 4:6; Efesios 3:14-21; 1 Tesalonicenses 4:7-8; 2 Tesalonicenses 2:13; 1 Pedro 1:2; 1 Juan 3:24; 4:13).'
      },
      {
        name: 'IV. Las Sagradas Escrituras',
        text: 'Creemos en la inspiración plenaria de las Sagradas Escrituras, por las cuales aceptamos los 66 libros del Antiguo y Nuevo Testamentos dados por inspiración divina, revelando infaliblemente la voluntad de Dios respecto a nosotros en todo lo necesario para nuestra salvación, de manera que no se debe imponer como Artículo de Fe ninguna enseñanza que no esté en ellas.',
        cites: '(Lucas 24:44-47; Juan 10:35; 1 Corintios 15:3-4; 2 Timoteo 3:15-17; 1 Pedro 1:10-12; 2 Pedro 1:20-21).'
      },
      {
        name: 'V. El pecado, original y personal',
        text: 'Creemos que el pecado entró en el mundo por la desobediencia de nuestros primeros padres, y la muerte por el pecado. Creemos que el pecado es de dos clases: Pecado original o depravación y pecado actual o personal. Creemos que el pecado original, o depravación, es aquella corrupción de la naturaleza de toda la descendencia de Adán, razón por la cual todo ser humano está muy apartado de la justicia original o estado de pureza de nuestros primeros padres al tiempo de su creación, es adverso a Dios, no tiene vida espiritual, está inclinado al mal y esto de continuo. Además, creemos que el pecado original continúa existiendo en la nueva vida del regenerado hasta que el corazón es totalmente limpiado por el bautismo con el Espíritu Santo. Creemos que el pecado original difiere del pecado actual, por cuanto constituye una propensión heredada al pecado actual de la que nadie es responsable, sino hasta que el remedio divinamente provisto haya sido menospreciado o rechazado. Creemos que el pecado actual o personal es la violación voluntaria de una ley conocida de Dios cometida por una persona moralmente responsable. Por tanto, no debe ser confundido con fallas involuntarias o inevitables, debilidades, faltas, errores, fracasos u otras desviaciones de una norma de conducta perfecta, los cuales son residuos de la caída. Sin embargo, tales efectos inocentes no incluyen actitudes o respuestas contrarias al Espíritu de Cristo, las que pueden llamarse propiamente pecados del espíritu. Creemos que el pecado personal es primordial y esencialmente una violación de la ley del amor y que, en relación con Cristo, el pecado puede definirse como incredulidad.',
        cites: '(Pecado original: Génesis 3; 6:5; Job 15:14; Salmo 51:5; Jeremías 17:9-10; Marcos 7:21-23; Romanos 1:18-25; 5:12-14; 7:1—8:9; 1 Corintios 3:1-4; Gálatas 5:16-25; 1 Juan 1:7-8. Pecado personal: Mateo 22:36-40; Juan 8:34-36; 16:8-9; Romanos 3:23; 6:15-23; 8:18-24; 14:23; 1 Juan 1:9—2:4; 3:7-10).'
      },
      {
        name: 'VI. La expiación',
        text: 'Creemos que Jesucristo por sus sufrimientos, por el derramamiento de su preciosa sangre y por su muerte en la cruz hizo una expiación plena por todo el pecado de la humanidad, y que esta expiación es la única base de la salvación y que es suficiente para todo individuo de la raza de Adán. La expiación es misericordiosamente eficaz para la salvación de aquellos incapaces de responsabilidad moral y para los niños en su inocencia, pero para los que llegan a la edad de responsabilidad es eficaz para su salvación solamente cuando se arrepienten y creen.',
        cites: '(Isaías 53:5-6, 11; Marcos 10:45; Lucas 24:46-48; Juan 1:29; 3:14-17; Hechos 4:10-12; Romanos 3:21-26; 4:17-25; 5:6-21; 1 Corintios 6:20; 2 Corintios 5:14-21; Gálatas 1:3-4; 3:13-14; Colosenses 1:19-23; 1 Timoteo 2:3-6; Tito 2:1114; Hebreos 2:9; 9:11-14; 13:12; 1 Pedro 1:18-21;2:19-25; 1 Juan 2:1-2).'
      },
      {
        name: 'VII. La gracia preveniente',
        text: 'Creemos que la creación de la raza humana a la imagen de Dios incluyó la capacidad de decidir entre el bien y el mal y que, por tanto, los seres humanos fueron hechos moralmente responsables; que a través de la caída de Adán ellos se tornaron depravados, de tal modo que ahora no pueden, por sí mismos y por sus capacidades y obras, volver a la fe e invocar a Dios. Pero también creemos que la gracia de Dios, por medio de Jesucristo, se concede gratuitamente a todas las personas, capacitando a todos los que quieran, para volverse del pecado a la justicia, para creer en Jesucristo y recibir perdón y limpieza del pecado, y para seguir las buenas obras agradables y aceptables ante Él. Creemos que todas las personas, aunque posean la experiencia de la regeneración y de la entera santificación, pueden caer de la gracia y apostatar y, a menos que se arrepientan de sus pecados, se perderán eternalmente y sin esperanza.',
        cites: '(Semejanza divina y responsabilidad moral: Génesis 1:26-27; 2:16-17; Deuteronomio 28:1-2; 30:19; Josué 24:15; Salmo 8:3-5; Isaías 1:8-10; Jeremías 31:29-30; Ezequiel 18:1-4; Miqueas 6:8; Romanos 1:19-20; 2:1-16; 14:7-12; Gálatas 6:7-8. Incapacidad natural: Job 14:4; 15:14; Salmos 14:1-4; 51:5; Juan 3:6a; Romanos 3:10-12; 5:12-14, 20a; 7:14-25. Don de gracia y obras de fe: Ezequiel 18:25-26; Juan 1:12-13; 3:6b; Hechos 5:31; Romanos 5:6-8, 18; 6:15-16, 23; 10:6-8; 11:22; 1 Corintios 2:9-14; 10:112; 2 Corintios 5:18-19; Gálatas 5:6; Efesios 2:8-10; Filipenses 2:12-13; Colosenses 1:21-23; 2 Timoteo 4:10a; Tito 2:11-14; Hebreos 2:1-3; 3:12-15; 6:4-6; 10:26-31; Santiago 2:18-22; 2 Pedro 1:10-11; 2:20-22).'
      },
      {
        name: 'VIII. El arrepentimiento',
        text: 'Creemos que el arrepentimiento, que es un cambio sincero y completo de la mente respecto al pecado, con el reconocimiento de culpa personal y la separación voluntaria del pecado, se exige de todos los que por acción o propósito han llegado a ser pecadores contra Dios. El Espíritu de Dios da a todos los que quieran arrepentirse la ayuda benigna de la contrición de corazón y la esperanza de misericordia para que puedan creer a fin de recibir perdón y vida espiritual.',
        cites: '(2 Crónicas 7:14; Salmos 32:5-6; 51:1-17; Isaías 55:6-7; Jeremías 3:12-14; Ezequiel 18:30-32; 33:14-16; Marcos 1:14-15; Lucas 3:1-14; 13:1-5;18:9-14; Hechos 2:38; 3:19; 5:31; 17:30-31; 26:16-18; Romanos 2:4; 2 Corintios 7:8-11; 1 Tesalonicenses 1:9; 2 Pedro 3:9).'
      },
      {
        name: 'IX. La justificación, la regeneración y la adopción',
        text: 'Creemos que la justificación es aquel acto benigno y judicial de Dios, por el cual Él concede pleno perdón de toda culpa, la remisión completa de la pena por los pecados cometidos y la aceptación como justos de los que creen en Jesucristo y lo reciben como Salvador y Señor. Creemos que la regeneración, o nuevo nacimiento, es aquella obra de gracia de Dios, por la cual la naturaleza moral del creyente arrepentido es vivificada espiritualmente y recibe una vida distintivamente espiritual, capaz de experimentar fe, amor y obediencia. Creemos que la adopción es aquel acto benigno de Dios, por el cual el creyente justificado y regenerado se constituye en hijo de Dios. Creemos que la justificación, la regeneración y la adopción son simultáneas en la experiencia de los que buscan a Dios y se obtienen por el requisito de la fe, precedida por el arrepentimiento y que el Espíritu Santo da testimonio de esta obra y estado de gracia.',
        cites: '(Lucas 18:14; Juan 1:12-13; 3:3-8; 5:24; Hechos 13:39; Romanos 1:17; 3:2126, 28; 4:5-9, 17-25; 5:1, 16-19; 6:4; 7:6; 8:1, 15-17; 1 Corintios 1:30; 6:11; 2 Corintios 5:17-21; Gálatas 2:16-21; 3:1-14, 26; 4:4-7; Efesios 1:6-7; 2:1, 4-5; Filipenses 3:3-9; Colosenses 2:13; Tito 3:4-7; 1 Pedro 1:23; 1 Juan 1:9; 3:1-2, 9; 4:7; 5:1, 9-13, 18).'
      },
      {
        name: 'X. La santidad cristiana y la entera santificación',
        text: 'Creemos que la santificación es la obra de Dios por medio de la cual transforma a los creyentes a la semejanza de Cristo. Ésta es efectuada mediante la gracia de Dios por el Espíritu Santo en la santificación inicial, o regeneración (simultánea a la justificación), la entera santificación y la obra continua de perfeccionamiento del creyente por el Espíritu Santo, culminando en la glorificación, en la cual somos completamente conformados a la imagen del Hijo. Creemos que la entera santificación es el acto de Dios, subsecuente a la regeneración, por el cual los creyentes son hechos libres del pecado original o depravación, y son llevados a un estado de entera devoción a Dios y a la santa obediencia de amor hecho perfecto. Es efectuada por la llenura o el bautismo con el Espíritu Santo; y en una sola experiencia incluye la limpieza de pecado del corazón y la morada permanente y continua del Espíritu Santo, capacitando al creyente para la vida y el servicio. La entera santificación es provista por la sangre de Jesús, efectuada instantáneamente por la gracia mediante la fe y precedida por la entera consagración. El Espíritu Santo da testimonio de esta obra y estado de gracia. Esta experiencia se conoce también con varios nombres que representan sus diferentes fases, tales como “la perfección cristiana”, “el amor perfecto”, “la pureza de corazón”, “la llenura o el bautismo con el Espíritu Santo”, “la plenitud de la bendición” y “la santidad cristiana”. Creemos que hay una clara distinción entre el corazón puro y el carácter maduro. El primero se obtiene instantáneamente como resultado de la entera santificación; el segundo es resultado del crecimiento en la gracia. Creemos que la gracia de la entera santificación incluye el impulso divino para crecer en gracia como discípulo semejante a Cristo. Sin embargo, este impulso se debe cultivar conscientemente, y se debe dar atención cuidadosa a los requisitos y procesos del desarrollo espiritual y mejoramiento de carácter y personalidad en semejanza a Cristo. Sin ese esfuerzo con tal propósito, el testimonio de uno puede debilitarse, y la gracia puede entorpecerse y finalmente perderse. Al participar en los medios de gracia, especialmente en la comunión cristiana, en las disciplinas espirituales y en los sacramentos de la iglesia, los creyentes crecen en gracia y en amor sincero para con Dios y con el prójimo.',
        cites: '(Jeremías 31:31-34; Ezequiel 36:25-27; Malaquías 3:2-3; Mateo 3:11-12; Lucas 3:16-17; Juan 7:37-39; 14:15-23; 17:6-20; Hechos 1:5; 2:1-4; 15:8-9; Romanos 6:11-13, 19; 8:1-4, 8-14; 12:1-2; 2 Corintios 6:14— 7:1; Gálatas 2:20; 5:16-25; Efesios 3:14-21; 5:17-18, 25-27; Filipenses 3:10-15; Colosenses 3:1-17; 1 Tesalonicenses 5:23-24; Hebreos 4:9-11; 10:10-17; 12:1-2; 13:12; 1 Juan 1:7, 9). (“Perfección cristiana”, “amor perfecto”: Deuteronomio 30:6; Mateo 5:43-48; 22:37-40; Romanos 12:9-21; 13:8-10; 1 Corintios 13; Filipenses 3:10-15; Hebreos 6:1; 1 Juan 4:17-18 “Pureza de corazón”: Mateo 5:8; Hechos 15:8-9; 1 Pedro 1:22; 1 Juan 3:3 “La llenura o el bautismo con el Espíritu Santo”: Jeremías 31:31-34; Ezequiel 36:25-27; Malaquías 3:2-3; Mateo 3:11-12; Lucas 3:16-17; Hechos 1:5; 2:1-4; 15:8-9 “Plenitud de la bendición”: Romanos 15:29 “Santidad cristiana”: Mateo 5:1—7:29; Juan 15:1-11; Romanos 12:1— 15:3; 2 Corintios 7:1; Efesios 4:17—5:20; Filipenses 1:9-11; 3:12-15; Colosenses 2:20—3:17; 1 Tesalonicenses 3:13; 4:7-8; 5:23; 2 Timoteo 2:19-22; Hebreos 10:19-25; 12:14; 13:20-21; 1 Pedro 1:15-16; 2 Pedro 1:1-11; 3:18; Judas 20-21).'
      },
      {
        name: 'XI. La Iglesia',
        text: 'Creemos en la Iglesia, la comunidad que confiesa a Jesucristo como Señor, el pueblo del pacto de Dios renovado en Cristo, el Cuerpo de Cristo llamado a ser uno por el Espíritu Santo mediante la Palabra. Dios llama a la Iglesia a expresar su vida en la unidad y la comunión del Espíritu; en adoración por medio de la predicación de la Palabra de Dios, en la observancia de los sacramentos y el ministerio en su nombre; en la obediencia a Cristo, la vida santa y la mutua rendición de cuentas. La misión de la Iglesia en el mundo es compartir la obra redentora y el ministerio reconciliador de Cristo en el poder del Espíritu. La Iglesia cumple su misión haciendo discípulos mediante el evangelismo, la educación, mostrando compasión, trabajando por la justicia y dando testimonio al reino de Dios. La Iglesia es una realidad histórica que se organiza en formas culturalmente adaptadas; existe tanto como congregaciones locales y como cuerpo universal; aparta a personas llamadas por Dios para ministerios específicos. Dios llama a la iglesia a vivir bajo su gobierno en anticipación de la consumación en la venida de nuestro Señor Jesucristo.',
        cites: '(Éxodo 19:3; Jeremías 31:33; Mateo 8:11; 10:7; 16:13-19, 24; 18:15-20; 28:1920; Juan 17:14-26; 20:21-23; Hechos 1:7-8; 2:32-47; 6:1-2; 13:1; 14:23; Romanos 2:28-29; 4:16; 10:9-15; 11:13-32; 12:1-8; 15:1-3; 1 Corintios 3:5-9; 7:17; 11:1, 17-33; 12:3, 12-31; 14:26-40; 2 Corintios 5:11—6:1; Gálatas 5:6, 13-14; 6:1-5, 15; Efesios 4:1-17; 5:25-27; Filipenses 2:1-16; 1 Tesalonicenses 4:1-12; 1 Timoteo 4:13; Hebreos 10:19-25; 1 Pedro 1:1-2, 13; 2:4-12, 21; 4:1-2, 10-11; 1 Juan 4:17; Judas 24; Apocalipsis 5:9-10).'
      },
      {
        name: 'XII. El bautismo',
        text: 'Creemos que el bautismo cristiano, ordenado por nuestro Señor, es un sacramento que significa la aceptación de los beneficios de la expiación de Jesucristo, que debe administrarse a los creyentes, y que declara su fe en Jesucristo como su Salvador y su pleno propósito de obediencia en santidad y justicia. Siendo el bautismo un símbolo del nuevo pacto, se puede bautizar a niños pequeños, a petición de sus padres o tutores, quienes prometerán la enseñanza cristiana necesaria. El bautismo puede ser administrado por aspersión, afusión o inmersión, según la preferencia del candidato.',
        cites: '(Mateo 3:1-7; 28:16-20; Hechos 2:37-41; 8:35-39; 10:44-48; 16:29-34; 19:16; Romanos 6:3-4; Gálatas 3:26-28; Colosenses 2:12; 1 Pedro 3:18-22).'
      },
      {
        name: 'XIII. La santa cena',
        text: 'Creemos que la cena conmemorativa y de comunión instituida por nuestro Señor y Salvador Jesucristo es esencialmente un sacramento del Nuevo Testamento, que declara su muerte expiatoria, por cuyos méritos los creyentes tienen vida y salvación, y la promesa de todas las bendiciones espirituales en Cristo. Es distintivamente para aquellos que están preparados para apreciar con reverencia su significado y por ella anuncian la muerte del Señor hasta que Él venga otra vez. Siendo la fiesta de comunión, sólo aquellos que tienen fe en Cristo y amor para los santos deben ser llamados a participar en ella.',
        cites: '(Éxodo 12:1-14; Mateo 26:26-29; Marcos 14:22-25; Lucas 22:17-20; Juan 6:28-58; 1 Corintios 10:14-21; 11:23-32).'
      },
      {
        name: 'XIV. La sanidad divina',
        text: 'Creemos en la doctrina bíblica de la sanidad divina e instamos a nuestro pueblo a ofrecer la oportunidad de hacer la oración de fe para la sanidad de los enfermos. Creemos también que Dios sana a través de la ciencia médica.',
        cites: '(2 Reyes 5:1-19; Salmos 103:1-5; Mateo 4:23-24; 9:18-35; Juan 4:46-54; Hechos 5:12-16; 9:32-42; 14:8-15; 1 Corintios 12:4-11; 2 Corintios 12:7-10; Santiago 5:13-16).'
      },
      {
        name: 'XV. La segunda venida de Cristo',
        text: 'Creemos que el Señor Jesucristo vendrá otra vez; que los que vivamos en el momento de su venida no precederemos a los que durmieron en Cristo Jesús; mas si hemos permanecido en Él, seremos arrebatados con los santos resucitados para reunirnos con el Señor en el aire, y estaremos siempre con Él.',
        cites: '(Mateo 25:31-46; Juan 14:1-3; Hechos 1:9-11; Filipenses 3:20-21; 1 Tesalonicenses 4:13-18; Tito 2:11-14; Hebreos 9:26-28; 2 Pedro 3:3-15; Apocalipsis 1:7-8; 22:7-20).'
      },
      {
        name: 'XVI. La resurrección, el juicio y el destino',
        text: 'Creemos en la resurrección de los muertos, que los cuerpos tanto de los justos como de los injustos serán resucitados y unidos con sus espíritus —“los que hicieron lo bueno, saldrán a resurrección de vida mas los que hicieron lo malo, a resurrección de condenación”. Creemos en el juicio futuro en el cual toda persona comparecerá ante Dios para ser juzgada según sus hechos en esta vida. Creemos que a los que son salvos por creer en Jesucristo nuestro Señor y le siguen en obediencia se les asegura la vida gloriosa y eterna; y que los que permanezcan impenitentes hasta el fin, sufrirán eternamente en el infierno.',
        cites: '(Génesis 18:25; 1 Samuel 2:10; Salmo 50:6; Isaías 26:19; Daniel 12:2-3; Mateo 25:31-46; Marcos 9:43-48; Lucas 16:19-31; 20:27-38; Juan 3:16- 18; 5:25-29; 11:21-27; Hechos 17:30-31; Romanos 2:1-16; 14:7-12; 1 Corintios 15:12-58; 2 Corintios 5:10; 2 Tesalonicenses 1:5-10; Apocalipsis 20:11-15; 22:1-15).'
      }
    ];
}
