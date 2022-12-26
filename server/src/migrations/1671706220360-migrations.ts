import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1671706220360 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
	// 	await queryRunner.query(`
    //     insert into post (title, description, creator_id) values ('Drugstore Cowboy', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

    //     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 40);
    //     insert into post (title, description, creator_id) values ('Drishyam', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 40);
    //     insert into post (title, description, creator_id) values ('Ploy', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 40);
    //     insert into post (title, description, creator_id) values ('Something from Nothing: The Art of Rap', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 40);
    //     insert into post (title, description, creator_id) values ('Chinese Coffee', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
        
    //     Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
        
    //     Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 40);
    //     insert into post (title, description, creator_id) values ('Final: The Rapture', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
        
    //     In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 40);
    //     insert into post (title, description, creator_id) values ('All the Invisible Children', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 40);
    //     insert into post (title, description, creator_id) values ('Best of the Best 3: No Turning Back', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 40);
    //     insert into post (title, description, creator_id) values ('Monday Night Mayhem', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        
    //     Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
        
    //     Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 40);
    //     insert into post (title, description, creator_id) values ('One and Only, The (Eneste ene, Den)', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 40);
    //     insert into post (title, description, creator_id) values ('Shoot-Out at Medicine Bend', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Tactical Force', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.
        
    //     In congue. Etiam justo. Etiam pretium iaculis justo.', 40);
    //     insert into post (title, description, creator_id) values ('Wings', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
        
    //     Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 40);
    //     insert into post (title, description, creator_id) values ('True Crime', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
        
    //     Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 40);
    //     insert into post (title, description, creator_id) values ('Hallelujah I''m a Bum', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
    //     Phasellus in felis. Donec semper sapien a libero. Nam dui.', 40);
    //     insert into post (title, description, creator_id) values ('Two for the Money', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 40);
    //     insert into post (title, description, creator_id) values ('Doctor Zhivago', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
        
    //     Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
        
    //     Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('Bright Young Things', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.
        
    //     Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.
        
    //     Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 40);
    //     insert into post (title, description, creator_id) values ('Whose Life Is It Anyway?', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
        
    //     Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
        
    //     Fusce consequat. Nulla nisl. Nunc nisl.', 40);
    //     insert into post (title, description, creator_id) values ('If I Stay', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 40);
    //     insert into post (title, description, creator_id) values ('Andre', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 40);
    //     insert into post (title, description, creator_id) values ('No Distance Left to Run', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('Special Delivery', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
        
    //     Sed ante. Vivamus tortor. Duis mattis egestas metus.', 40);
    //     insert into post (title, description, creator_id) values ('Boy Wonder', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
        
    //     Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 40);
    //     insert into post (title, description, creator_id) values ('Wilby Conspiracy, The', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 40);
    //     insert into post (title, description, creator_id) values ('Titan A.E.', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 40);
    //     insert into post (title, description, creator_id) values ('(Untitled)', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 40);
    //     insert into post (title, description, creator_id) values ('Gypsy', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('Graceland', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 40);
    //     insert into post (title, description, creator_id) values ('Lucky Jordan', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.
        
    //     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 40);
    //     insert into post (title, description, creator_id) values ('Prince and the Pauper, The', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Robe, The', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
        
    //     Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 40);
    //     insert into post (title, description, creator_id) values ('Alone for Christmas', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 40);
    //     insert into post (title, description, creator_id) values ('Atlantis, the Lost Continent', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
        
    //     Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
        
    //     Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 40);
    //     insert into post (title, description, creator_id) values ('Adventures of Priscilla, Queen of the Desert, The', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
        
    //     Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 40);
    //     insert into post (title, description, creator_id) values ('Bowfinger', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.
        
    //     Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.
        
    //     Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 40);
    //     insert into post (title, description, creator_id) values ('Everyday Sunshine:  The Story of Fishbone', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 40);
    //     insert into post (title, description, creator_id) values ('Outside Man, The (Un homme est mort)', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
        
    //     Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
    //     Phasellus in felis. Donec semper sapien a libero. Nam dui.', 40);
    //     insert into post (title, description, creator_id) values ('What Have I Done to Deserve This? (¿Qué he hecho yo para merecer esto!!)', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 40);
    //     insert into post (title, description, creator_id) values ('Mean Guns', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
        
    //     Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 40);
    //     insert into post (title, description, creator_id) values ('Freaks', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
        
    //     In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
        
    //     Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 40);
    //     insert into post (title, description, creator_id) values ('Orphanage, The (Orfanato, El)', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 40);
    //     insert into post (title, description, creator_id) values ('Lips of Blood (Lèvres de sang)', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
    //     Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Body Count', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
        
    //     Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
    //     Phasellus in felis. Donec semper sapien a libero. Nam dui.', 40);
    //     insert into post (title, description, creator_id) values ('Bloodfist', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 40);
    //     insert into post (title, description, creator_id) values ('RKO 281', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
        
    //     Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 40);
    //     insert into post (title, description, creator_id) values ('Sun Don''t Shine', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
        
    //     Sed ante. Vivamus tortor. Duis mattis egestas metus.
        
    //     Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 40);
    //     insert into post (title, description, creator_id) values ('Forsaking All Others', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 40);
    //     insert into post (title, description, creator_id) values ('Rhapsody in Blue', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
        
    //     Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 40);
    //     insert into post (title, description, creator_id) values ('Targets', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
    //     Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Boyfriends and Girlfriends (a.k.a. My Girlfriend''s Boyfriend) (L''ami de mon amie)', 'Fusce consequat. Nulla nisl. Nunc nisl.', 40);
    //     insert into post (title, description, creator_id) values ('JFK: The Smoking Gun', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 40);
    //     insert into post (title, description, creator_id) values ('Contract, The', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 40);
    //     insert into post (title, description, creator_id) values ('Acts of Worship ', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 40);
    //     insert into post (title, description, creator_id) values ('I Give It a Year', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.
        
    //     Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 40);
    //     insert into post (title, description, creator_id) values ('School for Scoundrels', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
        
    //     Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
        
    //     Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 40);
    //     insert into post (title, description, creator_id) values ('Personals, The (Zheng hun qi shi)', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
    //     Phasellus in felis. Donec semper sapien a libero. Nam dui.
        
    //     Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 40);
    //     insert into post (title, description, creator_id) values ('Jimi: All Is by My Side', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
    //     Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Invincible', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
        
    //     Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 40);
    //     insert into post (title, description, creator_id) values ('Dear God', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
    //     Phasellus in felis. Donec semper sapien a libero. Nam dui.
        
    //     Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 40);
    //     insert into post (title, description, creator_id) values ('Reckless', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
        
    //     Fusce consequat. Nulla nisl. Nunc nisl.', 40);
    //     insert into post (title, description, creator_id) values ('Swan Princess: Escape from Castle Mountain, The', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 40);
    //     insert into post (title, description, creator_id) values ('Mummy Returns, The', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 40);
    //     insert into post (title, description, creator_id) values ('Regular Guys (Echte Kerle)', 'Fusce consequat. Nulla nisl. Nunc nisl.
        
    //     Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 40);
    //     insert into post (title, description, creator_id) values ('Saragossa Manuscript, The (Rekopis znaleziony w Saragossie)', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 40);
    //     insert into post (title, description, creator_id) values ('Blades of Glory', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.
        
    //     Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.
        
    //     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 40);
    //     insert into post (title, description, creator_id) values ('Great Happiness Space, The: Tale of an Osaka Love Thief', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 40);
    //     insert into post (title, description, creator_id) values ('Princess Tam-Tam (Princesse Tam-Tam)', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('Time to Leave', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
        
    //     Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 40);
    //     insert into post (title, description, creator_id) values ('Magic Trip', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 40);
    //     insert into post (title, description, creator_id) values ('Mobsters', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
    //     Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Professional, The (Le professionnel)', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
        
    //     Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 40);
    //     insert into post (title, description, creator_id) values ('Liberation of L.B. Jones, The', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('When You''re Strange', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.
        
    //     Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.
        
    //     Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 40);
    //     insert into post (title, description, creator_id) values ('Barefoot Contessa, The', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 40);
    //     insert into post (title, description, creator_id) values ('Pulp Fiction', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
        
    //     Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 40);
    //     insert into post (title, description, creator_id) values ('Women Art Revolution', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 40);
    //     insert into post (title, description, creator_id) values ('Hell''s Highway', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
        
    //     Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('700 Sundays', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
        
    //     Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.
        
    //     Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 40);
    //     insert into post (title, description, creator_id) values ('He Loves Me... He Loves Me Not (À la folie... pas du tout)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 40);
    //     insert into post (title, description, creator_id) values ('Whole Ten Yards, The', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
        
    //     Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 40);
    //     insert into post (title, description, creator_id) values ('Harder They Fall, The', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 40);
    //     insert into post (title, description, creator_id) values ('Young Guns', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.
        
    //     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 40);
    //     insert into post (title, description, creator_id) values ('It''s Love I''m After', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 40);
    //     insert into post (title, description, creator_id) values ('Happiness Never Comes Alone (Un bonheur n''arrive jamais seul)', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
    //     Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
        
    //     Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 40);
    //     insert into post (title, description, creator_id) values ('Tinpis Run', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 40);
    //     insert into post (title, description, creator_id) values ('Ten Thousand Saints', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
        
    //     Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 40);
    //     insert into post (title, description, creator_id) values ('Five Heartbeats, The', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
        
    //     Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 40);
    //     insert into post (title, description, creator_id) values ('Reno 911!: Miami', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
        
    //     Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 40);
    //     insert into post (title, description, creator_id) values ('Waterloo Bridge', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        
    //     Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 40);
    //     insert into post (title, description, creator_id) values ('Circle of Deception, A', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
        
    //     Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 40);
    //     insert into post (title, description, creator_id) values ('Latin Music USA', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.
        
    //     In congue. Etiam justo. Etiam pretium iaculis justo.
        
    //     In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 40);
    //     insert into post (title, description, creator_id) values ('Snow Falling on Cedars', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
        
    //     Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
        
    //     In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 40);
    //     insert into post (title, description, creator_id) values ('Marc Maron: Thinky Pain', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
        
    //     Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
        
    //     Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 40);
    //     insert into post (title, description, creator_id) values ('Evil (Ondskan)', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
        
    //     Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
        
    //     Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 40);
    //     insert into post (title, description, creator_id) values ('Aliyah (Alyah) ', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
        
    //     Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 40);
    //     insert into post (title, description, creator_id) values ('Come Blow Your Horn', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 40);
    //     insert into post (title, description, creator_id) values ('Tracker, The', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
        
    //     Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 40);
    //     insert into post (title, description, creator_id) values ('Casting Couch', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
        
    //     Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 40);
    //     insert into post (title, description, creator_id) values ('Marie Antoinette', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.
        
    //     Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 40);`);
	// 
    }

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
