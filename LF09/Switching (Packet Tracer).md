___
Bestandteil folgender docs:
- 

Online-Links:
- 

Zugehörig zu:
#LF09 
___
# EtherChannel

__Switch EG__
```
enable
conf t
! --- zum KG ---
interface range gi1/0/1 - 4
 channel-group 1 mode active
 exit
interface port-channel 1
 switchport mode trunk
 exit
! --- zum 1.OG ---
interface range gi1/0/5 - 6
 channel-group 2 mode active
 exit
interface port-channel 2
 switchport mode trunk
 end
```

__Switch KG__
```
enable
conf t
interface range gi1/0/1 - 4
 channel-group 1 mode active
 exit
interface port-channel 1
 switchport mode trunk
 end
```

__Switch 1.OG__
```
enable
conf t
interface range gi0/1 - 2
 channel-group 2 mode active
 exit
interface port-channel 2
 switchport mode trunk
 end
```

__Prüfung__
```
show etherchannel summary
```


# Trunkports

__Festlegen__
```
enable
conf t
hostname SW-3OG
interface range fa0/1, gi0/1
 switchport mode trunk
 switchport trunk native vlan 999
end
```

__Überprüfen__
`show interfaces trunk`


# VLANs

__Anlegen__
```
vlan 10          ← legt VLAN 10 an und wechselt in dessen Konfiguration
 name VLAN10     ← gibt dem VLAN einen Namen
vlan 20
 name VLAN20
...
```

__Anzeigen__
`show vlan brief`

