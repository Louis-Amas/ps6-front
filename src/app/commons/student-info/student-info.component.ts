import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  MAJOR_LIST: any[] = [
    {
      major: 'BAT',
      specialty: []
    },
    {
      major: 'SI',
      specialty: ['Architecture logicielle', 'Cryptographie, sécurité et vie privée dans les applications et les réseaux',
        'Intelligence Ambiante', 'Interactions Homme - Machine', 'Sciences, Technologies, Ressources et Applications du Web',
        'Informatique et Mathématiques Appliquées à la Finance et à l\'Assurance', 'Science des Données']
    },
    {
      major: 'MAM',
      specialty: ['Informatique et mathématiques appliquées à la finance et l\'assurance', 'Ingénierie numérique',
      'Science des données']
    },
    {
      major: 'ELEC',
      specialty: ['Conception de circuits et systèmes', 'Génie du système embarqué', 'Télécommunications et réseaux ']
    },
    {
      major: 'GB',
      specialty: ['Pharmacologie et Biotechnologie', 'Toxicologie et Sécurité en Santé et Environnement',
      'Bioinformatique et Modélisation pour la Biologie']
    },
    {
      major: 'GE',
      specialty: ['Exploitation des services publics de l\'eau', 'Hydroinformatique']
    },
  ];

  @Input() currentStudent: User;

  constructor() { }

  ngOnInit() {
  }

}

