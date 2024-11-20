from django.db import models

class Autism(models.Model):
    MALE= 1
    FEMALE = 0
    YES = 1
    NO = 0
    SELF = 0
    PARENT =1
    HEALTH_CARE_PROFESSIONAL=2
    RELATIVE=3
    OTHER=4
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female')
    )
    JUNDICE_CHOICES = (
        (YES, 'Yes'),
        (NO, 'No')
    )
    USEDSCREENINGBEFORE_CHOICES = (
        (YES, 'Yes'),
        (NO, 'No')
    )
    WHOISTAKINGTEST_CHOICES = (
        (SELF, 'Self'),
        (PARENT, 'Parent'),
        (HEALTH_CARE_PROFESSIONAL, 'Health care professional'),
        (RELATIVE, 'Relative'),
        (OTHER, 'Other')
    )
    Q_CHOICES = (
        (YES, 'Yes'),
        (NO, 'No')
    )

    age = models.IntegerField(default=NO)
    gender = models.IntegerField(choices=GENDER_CHOICES)
    jundice = models.IntegerField(choices=JUNDICE_CHOICES)
    usedscreeningbefore = models.IntegerField(choices=USEDSCREENINGBEFORE_CHOICES)
    whoistakingtest = models.IntegerField(choices=WHOISTAKINGTEST_CHOICES)
    q1 = models.IntegerField(choices=Q_CHOICES)
    q2 = models.IntegerField(choices=Q_CHOICES)
    q3 = models.IntegerField(choices=Q_CHOICES)
    q4 = models.IntegerField(choices=Q_CHOICES)
    q5 = models.IntegerField(choices=Q_CHOICES)
    q6 = models.IntegerField(choices=Q_CHOICES)
    q7 = models.IntegerField(choices=Q_CHOICES)
    q8 = models.IntegerField(choices=Q_CHOICES)
    q9 = models.IntegerField(choices=Q_CHOICES)
    q10 = models.IntegerField(choices=Q_CHOICES)
